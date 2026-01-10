//Database connection
const connectDB = require("../db/connect"); 

/**
 * Generates a unique student number in format: STU + YEAR + sequential number
 * Example: STU2024001, STU2024002, etc.
 * @returns {Promise<string>} The generated student number
 */
const generateStudentNumber = async () => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const currentYear = new Date().getFullYear();
    const prefix = `STU${currentYear}`;
    
    // Get the last student number for this year with row lock
    const [rows] = await connection.query(
      `SELECT studentNumber 
       FROM Student 
       WHERE studentNumber LIKE ? 
       ORDER BY studentNumber DESC 
       LIMIT 1 
       FOR UPDATE`,
      [`${prefix}%`]
    );
    
    let newNumber;
    if (rows.length === 0) {
      // First student of the year
      newNumber = `${prefix}001`;
    } else {
      // Extract the numeric part and increment
      const lastNumber = rows[0].studentNumber;
      const numericPart = parseInt(lastNumber.slice(-3)); // Get last 3 digits
      const nextNumber = numericPart + 1;
      newNumber = `${prefix}${String(nextNumber).padStart(3, '0')}`;
    }
    
    // Verify uniqueness (safety check)
    const exists = await checkStudentNumberExists(newNumber, connection);
    if (exists) {
      throw new Error(`Generated student number ${newNumber} already exists`);
    }
    
    await connection.commit();
    return newNumber;
    
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to generate student number: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Checks if a student number already exists in the database
 * @param {string} studentNumber - The student number to check
 * @param {object} connection - Optional DB connection for transactions
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
const checkStudentNumberExists = async (studentNumber, connection = null) => {
  try {
    const conn = connection || connectDB;
    
    const [rows] = await conn.query(
      'SELECT studentNumber FROM Student WHERE studentNumber = ?',
      [studentNumber]
    );
    
    return rows.length > 0;
    
  } catch (error) {
    throw new Error(`Failed to check student number existence: ${error.message}`);
  }
};

/**
 * Reserves a student number by creating a placeholder record
 * This ensures the number won't be reused if step 2 fails
 * @param {number} userId - The user ID from Users table
 * @param {string} studentNumber - The generated student number
 * @param {number} qualificationId - The qualification ID
 * @param {number} yearOfStudy - The year of study
 * @param {string} levelOfEducation - Level of education (optional)
 * @returns {Promise<object>} The created student record
 */
const reserveStudentNumber = async (userId, studentNumber, qualificationId, yearOfStudy, levelOfEducation = null) => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Check if student record already exists for this user
    const [existing] = await connection.query(
      'SELECT studentId FROM Student WHERE studentId = ?',
      [userId]
    );
    
    if (existing.length > 0) {
      throw new Error(`Student record already exists for user ID ${userId}`);
    }
    
    // Create the student record
    const [result] = await connection.query(
      `INSERT INTO Student (studentId, studentNumber, levelOfEducation, yearOfStudy, qualificationId) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, studentNumber, levelOfEducation, yearOfStudy, qualificationId]
    );

     // Adding this at a later stage 
     // Re-query the canonical record -> initial setup gave me issues with the return types (studentId & yearOfStudy being strings)
     // return was manually made initially hence the switch 
    const [rows] = await connection.query(
      `SELECT 
         studentId,
         studentNumber,
         levelOfEducation,
         yearOfStudy,
         qualificationId
       FROM Student
       WHERE studentId = ?`,
      [userId]
    );

    await connection.commit();
    /*
    return {
      studentId: userId,
      studentNumber,
      levelOfEducation,
      yearOfStudy,
      qualificationId
    };
    */
   
    // rows[0] is now typed according to the DB schema
    return rows[0];

  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to reserve student number: ${error.message}`);
  } finally {
    connection.release();
  }
};

module.exports = {
  generateStudentNumber,
  checkStudentNumberExists,
  reserveStudentNumber,
};