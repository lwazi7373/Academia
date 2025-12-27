 //Database connection
const connectDB = require("../db/connect"); 

/**
 * Automatically assigns modules to a student based on their qualification, year, and semester
 * Queries QualificationModule to find which modules should be assigned
 * @param {number} studentId - The student's user ID
 * @param {number} qualificationId - The qualification ID
 * @param {number} yearOfStudy - The academic year (1, 2, 3, etc.)
 * @param {number} semesterNo - The semester number (1 or 2)
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToStudent = async (studentId, qualificationId, yearOfStudy, semesterNo) => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Get all modules for this qualification, year, and semester
    const [modules] = await connection.query(
      `SELECT qm.moduleId, m.moduleName, m.moduleCode, m.credits, qm.isCompulsory
       FROM QualificationModule qm
       INNER JOIN Module m ON qm.moduleId = m.moduleId
       WHERE qm.qualificationId = ? 
       AND qm.academicYear = ? 
       AND qm.semesterNo = ?`,
      [qualificationId, yearOfStudy, semesterNo]
    );
    
    if (modules.length === 0) {
      await connection.commit();
      return [];
    }
    
    const assignedModules = [];
    
    // Insert each module into StudentModule
    for (const module of modules) {
      // Check if already assigned (prevent duplicates)
      const [existing] = await connection.query(
        'SELECT studentModuleId FROM StudentModule WHERE studentId = ? AND moduleId = ?',
        [studentId, module.moduleId]
      );
      
      if (existing.length === 0) {
        await connection.query(
          'INSERT INTO StudentModule (studentId, moduleId) VALUES (?, ?)',
          [studentId, module.moduleId]
        );
        
        assignedModules.push({
          moduleId: module.moduleId,
          moduleName: module.moduleName,
          moduleCode: module.moduleCode,
          credits: module.credits,
          isCompulsory: module.isCompulsory
        });
      }
    }
    
    await connection.commit();
    return assignedModules;
    
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to assign modules to student: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Assigns specific modules to a lecturer
 * @param {number} lecturerId - The lecturer's user ID
 * @param {Array<number>} moduleIds - Array of module IDs to assign
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToLecturer = async (lecturerId, moduleIds) => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const assignedModules = [];
    
    for (const moduleId of moduleIds) {
      // Check if already assigned
      const [existing] = await connection.query(
        'SELECT lecturerModuleId FROM LecturerModule WHERE lecturerId = ? AND moduleId = ?',
        [lecturerId, moduleId]
      );
      
      if (existing.length === 0) {
        await connection.query(
          'INSERT INTO LecturerModule (lecturerId, moduleId) VALUES (?, ?)',
          [lecturerId, moduleId]
        );
        
        // Get module details
        const [moduleDetails] = await connection.query(
          'SELECT moduleId, moduleName, moduleCode, credits FROM Module WHERE moduleId = ?',
          [moduleId]
        );
        
        if (moduleDetails.length > 0) {
          assignedModules.push(moduleDetails[0]);
        }
      }
    }
    
    await connection.commit();
    return assignedModules;
    
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to assign modules to lecturer: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Assigns specific modules to a coordinator
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {Array<number>} moduleIds - Array of module IDs to assign
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToCoordinator = async (coordinatorId, moduleIds) => {
  const connection = await connectDB.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const assignedModules = [];
    
    for (const moduleId of moduleIds) {
      // Check if already assigned
      const [existing] = await connection.query(
        'SELECT coordinatorModuleId FROM CoordinatorModule WHERE coordinatorId = ? AND moduleId = ?',
        [coordinatorId, moduleId]
      );
      
      if (existing.length === 0) {
        await connection.query(
          'INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES (?, ?)',
          [coordinatorId, moduleId]
        );
        
        // Get module details
        const [moduleDetails] = await connection.query(
          'SELECT moduleId, moduleName, moduleCode, credits FROM Module WHERE moduleId = ?',
          [moduleId]
        );
        
        if (moduleDetails.length > 0) {
          assignedModules.push(moduleDetails[0]);
        }
      }
    }
    
    await connection.commit();
    return assignedModules;
    
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to assign modules to coordinator: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Gets all modules assigned to a student
 * @param {number} studentId - The student's user ID
 * @returns {Promise<Array>} Array of modules
 */
const getStudentModules = async (studentId) => {
  try {
    const [modules] = await connectDB.query(
      `SELECT m.moduleId, m.moduleName, m.moduleCode, m.credits, sm.studentModuleId
       FROM StudentModule sm
       INNER JOIN Module m ON sm.moduleId = m.moduleId
       WHERE sm.studentId = ?`,
      [studentId]
    );
    
    return modules;
  } catch (error) {
    throw new Error(`Failed to get student modules: ${error.message}`);
  }
};

/**
 * Gets all modules assigned to a lecturer
 * @param {number} lecturerId - The lecturer's user ID
 * @returns {Promise<Array>} Array of modules
 */
const getLecturerModules = async (lecturerId) => {
  try {
    const [modules] = await connectDB.query(
      `SELECT m.moduleId, m.moduleName, m.moduleCode
        FROM LecturerModule lm
        JOIN Module m ON m.moduleId = lm.moduleId
        WHERE lm.lecturerId = ?;`,
      [lecturerId]
    );
    
    return modules;
  } catch (error) {
    throw new Error(`Failed to get lecturer modules: ${error.message}`);
  }
};

/**
 * Gets all modules for a specific qualification, year, and semester
 * Useful for displaying available modules before assignment
 * @param {number} qualificationId - The qualification ID
 * @param {number} academicYear - The academic year
 * @param {number} semesterNo - The semester number
 * @returns {Promise<Array>} Array of modules
 */
const getModulesByQualification = async (qualificationId, academicYear, semesterNo) => {
  try {
    const [modules] = await connectDB.query(
      `SELECT m.moduleId, m.moduleName, m.moduleCode, m.credits, qm.isCompulsory
       FROM QualificationModule qm
       INNER JOIN Module m ON qm.moduleId = m.moduleId
       WHERE qm.qualificationId = ? 
       AND qm.academicYear = ? 
       AND qm.semesterNo = ?`,
      [qualificationId, academicYear, semesterNo]
    );
    
    return modules;
  } catch (error) {
    throw new Error(`Failed to get modules by qualification: ${error.message}`);
  }
};

/**
 * Gets all modules in a specific department
 * Useful for staff registration - showing available modules to assign
 * @param {number} departmentId - The department ID
 * @returns {Promise<Array>} Array of modules
 */
const getModulesByDepartment = async (departmentId) => {
  try {
    const [modules] = await connectDB.query(
      `SELECT moduleId, moduleName, moduleCode, credits
       FROM Module
       WHERE departmentId = ?
       ORDER BY moduleCode`,
      [departmentId]
    );
    
    return modules;
  } catch (error) {
    throw new Error(`Failed to get modules by department: ${error.message}`);
  }
};

module.exports = {
  assignModulesToStudent,
  assignModulesToLecturer,
  assignModulesToCoordinator,
  getStudentModules,
  getLecturerModules,
  getModulesByQualification,
  getModulesByDepartment,
};