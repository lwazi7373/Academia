//Database connection
const connectDB = require("../db/connect"); 

/**
 * Generates a unique staff number in format: STF + YEAR + sequential number
 * Example: STF2024001, STF2024002, etc.
 * @returns {Promise<string>} The generated staff number
 */
const generateStaffNumber = async () => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const currentYear = new Date().getFullYear();
    const prefix = `STF${currentYear}`;
    
    // Get the last staff number across all staff tables (Lecturer, Coordinator, HOD)
    const [lecturerRows] = await connection.query(
      `SELECT staffNumber FROM Lecturer WHERE staffNumber LIKE ? ORDER BY staffNumber DESC LIMIT 1 FOR UPDATE`,
      [`${prefix}%`]
    );
    
    const [coordinatorRows] = await connection.query(
      `SELECT staffNumber FROM Coordinator WHERE staffNumber LIKE ? ORDER BY staffNumber DESC LIMIT 1 FOR UPDATE`,
      [`${prefix}%`]
    );
    
    const [hodRows] = await connection.query(
      `SELECT staffNumber FROM HOD WHERE staffNumber LIKE ? ORDER BY staffNumber DESC LIMIT 1 FOR UPDATE`,
      [`${prefix}%`]
    );
    
    // Combine all staff numbers and find the highest
    const allStaffNumbers = [
      ...lecturerRows.map(r => r.staffNumber),
      ...coordinatorRows.map(r => r.staffNumber),
      ...hodRows.map(r => r.staffNumber)
    ].sort().reverse();
    
    let newNumber;
    if (allStaffNumbers.length === 0) {
      // First staff member of the year
      newNumber = `${prefix}001`;
    } else {
      // Extract the numeric part and increment
      const lastNumber = allStaffNumbers[0];
      const numericPart = parseInt(lastNumber.slice(-3)); // Get last 3 digits
      const nextNumber = numericPart + 1;
      newNumber = `${prefix}${String(nextNumber).padStart(3, '0')}`;
    }
    
    // Verify uniqueness across all staff tables
    const exists = await checkStaffNumberExists(newNumber, connection);
    if (exists) {
      throw new Error(`Generated staff number ${newNumber} already exists`);
    }
    
    await connection.commit();
    return newNumber;
    
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to generate staff number: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Checks if a staff number already exists in any staff table
 * @param {string} staffNumber - The staff number to check
 * @param {object} connection - Optional DB connection for transactions
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
const checkStaffNumberExists = async (staffNumber, connection = null) => {
  try {
    const conn = connection || connectDB;
    
    // Check all three staff tables
    const [lecturerRows] = await conn.query(
      'SELECT staffNumber FROM Lecturer WHERE staffNumber = ?',
      [staffNumber]
    );
    
    const [coordinatorRows] = await conn.query(
      'SELECT staffNumber FROM Coordinator WHERE staffNumber = ?',
      [staffNumber]
    );
    
    const [hodRows] = await conn.query(
      'SELECT staffNumber FROM HOD WHERE staffNumber = ?',
      [staffNumber]
    );
    
    return lecturerRows.length > 0 || coordinatorRows.length > 0 || hodRows.length > 0;
    
  } catch (error) {
    throw new Error(`Failed to check staff number existence: ${error.message}`);
  }
};

/**
 * Reserves a staff number by creating a record in the appropriate staff table
 * @param {number} userId - The user ID from Users table
 * @param {string} staffNumber - The generated staff number
 * @param {number} departmentId - The department ID
 * @param {string} userRole - The type of staff: 'LECTURER', 'COORDINATOR', or 'HOD'
 * @returns {Promise<object>} The created staff record
 */
const reserveStaffNumber = async (userId, staffNumber, departmentId, userRole) => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Validate staff type
    const validStaffTypes = ['LECTURER', 'COORDINATOR', 'HOD'];
    if (!validStaffTypes.includes(userRole)) {
      throw new Error(`Invalid staff type: ${userRole}. Must be one of ${validStaffTypes.join(', ')}`);
    }
    
    let tableName, idField, result;
    
    // Determine which table to insert into
    switch (userRole) {
      case 'LECTURER':
        tableName = 'Lecturer';
        idField = 'lecturerId';
        break;
      case 'COORDINATOR':
        tableName = 'Coordinator';
        idField = 'coordinatorId';
        break;
      case 'HOD':
        tableName = 'HOD';
        idField = 'hodId';
        break;
    }
    
    // Check if staff record already exists for this user in this table
    const [existing] = await connection.query(
      `SELECT ${idField} FROM ${tableName} WHERE ${idField} = ?`,
      [userId]
    );
    
    if (existing.length > 0) {
      throw new Error(`${staffType} record already exists for user ID ${userId}`);
    }
    
    // Create the staff record
    [result] = await connection.query(
      `INSERT INTO ${tableName} (${idField}, departmentId, staffNumber) 
       VALUES (?, ?, ?)`,
      [userId, departmentId, staffNumber]
    );
    
     // Re-query canonical record (Same issue as studentNumber service)
    const [rows] = await connection.query(
      `SELECT 
         ${idField} AS userId,
         staffNumber,
         departmentId
       FROM ${tableName}
       WHERE ${idField} = ?`,
      [userId]
    );

    await connection.commit();

    // Add role explicitly (it does not live in the table)
    return {
      ...rows[0],
      userRole
    };
    // Never return data you didn’t read from the database. (JavaScript will shock you)
    /*
    return {
      userId,
      staffNumber,
      departmentId,
      userRole,
      tableName
    };
    */

  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to reserve staff number: ${error.message}`);
  } finally {
    connection.release();
  }
};

module.exports = {
  generateStaffNumber,
  checkStaffNumberExists,
  reserveStaffNumber,
};