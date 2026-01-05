 //Database connection
const connectDB = require("../db/connect"); 

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

/**
 * Get all students enrolled in a specific module
 * Returns student basic information (student number, first name, last name)
 * @param {number} moduleId - The ID of the module
 * @returns {Array} Array of student objects with basic info
 * @throws {Error} If database error occurs
 * TO NOTE:
 * - Only returns active students (isActive = 1)
 * - Ordered alphabetically by last name, then first name
 * - Includes student number for identification
 */
const getModuleStudents = async (moduleId) => {
    try {
        // Query to get all students enrolled in the module
        const [students] = await connectDB.execute(
            `SELECT 
                s.studentId,
                s.studentNumber,
                u.firstName,
                u.lastName
             FROM Student s
             INNER JOIN Users u ON s.studentId = u.userId
             INNER JOIN StudentModule sm ON s.studentId = sm.studentId
             WHERE sm.moduleId = ?
                AND u.isActive = 1
             ORDER BY u.lastName ASC, u.firstName ASC`,
            [moduleId]
        );

        // Format the response into an array of student objects
        return students.map(student => ({
            studentId: student.studentId,
            studentNumber: student.studentNumber,
            firstName: student.firstName,
            lastName: student.lastName,
            fullName: `${student.firstName} ${student.lastName}`
        }));

    } catch (error) {
        console.error('Error getting module students:', error);
        throw error;
    }
};

/**
 * Get all modules for a student with their performance metrics
 * Returns module codes, average marks, and risk levels from the latest risk reports
 * @param {number} studentId - The ID of the student
 * @returns {Array} Array of module objects with performance data
 * @throws {Error} If database error occurs
 * TO NOTE:
 * - Returns all modules the student is enrolled in
 * - Average mark and risk level come from the most recent risk report
 * - If no risk report exists for a module, averageMark and riskLevel will be null
 * - Includes attendance and submission rates for context
 * - Ordered by module code
 */
const getStudentModulePerformance = async (studentId) => {
    try {
        // Query to get all modules with latest risk report data
        const [modules] = await connectDB.execute(
            `SELECT 
                m.moduleId,
                m.moduleCode,
                m.moduleName,
                sm.studentModuleId,
                rr.averageMark,
                rr.riskLevel,
                rr.attendanceRate,
                rr.submissionRate,
                rr.calculatedAt
             FROM StudentModule sm
             INNER JOIN Module m ON sm.moduleId = m.moduleId
             LEFT JOIN (
                 SELECT 
                     studentModuleId,
                     averageMark,
                     riskLevel,
                     attendanceRate,
                     submissionRate,
                     calculatedAt,
                     ROW_NUMBER() OVER (PARTITION BY studentModuleId ORDER BY calculatedAt DESC) as rn
                 FROM RiskReport
             ) rr ON sm.studentModuleId = rr.studentModuleId AND rr.rn = 1
             WHERE sm.studentId = ?
             ORDER BY m.moduleCode ASC`,
            [studentId]
        );

        // Format the response into an array of module performance objects
        return modules.map(module => ({
            moduleId: module.moduleId,
            moduleCode: module.moduleCode,
            moduleName: module.moduleName,
            averageMark: module.averageMark !== null ? parseFloat(module.averageMark) : null,
            riskLevel: module.riskLevel || null,
            attendanceRate: module.attendanceRate !== null ? parseFloat(module.attendanceRate) : null,
            submissionRate: module.submissionRate !== null ? parseFloat(module.submissionRate) : null,
            lastCalculated: module.calculatedAt || null
        }));

    } catch (error) {
        console.error('Error getting student module performance:', error);
        throw error;
    }
};

module.exports = {
  getModuleStudents,
  getStudentModules,
  getLecturerModules,
  getModulesByQualification,
  getModulesByDepartment,
  getStudentModulePerformance
};