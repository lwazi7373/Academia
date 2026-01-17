//Database connection
const connectDB = require("../db/connect");
// For Error handling
const { badRequest, forbidden, notFound } = require("../errors/httpErrors");

/**
 * Gets all modules assigned to a coordinator
 * Note a Coordinator in this system is respoonsible for one module, but if there was ever a change
 * @param {number} coordinatorId - The coordinator's user ID
 * @returns {Promise<Array>} Array of modules with basic info
 */
const getCoordinatorModules = async (coordinatorId) => {
  const [modules] = await connectDB.query(
    `SELECT m.moduleId, m.moduleName, m.moduleCode, m.credits, cm.coordinatorModuleId
       FROM CoordinatorModule cm
       INNER JOIN Module m ON cm.moduleId = m.moduleId
       WHERE cm.coordinatorId = ?`,
    [coordinatorId],
  );

  return modules;
};

/**
 * Gets risk summary for a specific module
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} moduleId - The module ID
 * @returns {Promise<Object>} Risk summary with counts and percentages
 */
const getModuleRiskSummary = async (coordinatorId, moduleId) => {
  // First verify coordinator has access to this module
  const [access] = await connectDB.query(
    `SELECT coordinatorModuleId FROM CoordinatorModule 
       WHERE coordinatorId = ? AND moduleId = ?`,
    [coordinatorId, moduleId],
  );

  if (access.length === 0) {
    throw forbidden("Coordinator does not have access to this module");
  }

  // Get the active academic period
  const [activePeriod] = await connectDB.query(
    `SELECT periodId FROM academicPeriod WHERE isActive = TRUE LIMIT 1`,
  );

  if (activePeriod.length === 0) {
    throw notFound("No active academic period found");
  }

  const periodId = activePeriod[0].periodId;

  // Get risk level counts and total students
  const [riskData] = await connectDB.query(
    `SELECT 
         COUNT(DISTINCT sm.studentId) as totalStudents,
         SUM(CASE WHEN rr.riskLevel = 'HIGH' THEN 1 ELSE 0 END) as highRiskCount,
         SUM(CASE WHEN rr.riskLevel = 'MODERATE' THEN 1 ELSE 0 END) as moderateRiskCount,
         SUM(CASE WHEN rr.riskLevel = 'LOW' THEN 1 ELSE 0 END) as lowRiskCount
       FROM StudentModule sm
       LEFT JOIN RiskReport rr ON sm.studentModuleId = rr.studentModuleId AND rr.periodId = ?
       WHERE sm.moduleId = ?`,
    [periodId, moduleId],
  );

  const data = riskData[0];
  const total = parseInt(data.totalStudents) || 0;

  return {
    totalStudents: total,
    highRiskCount: parseInt(data.highRiskCount) || 0,
    moderateRiskCount: parseInt(data.moderateRiskCount) || 0,
    lowRiskCount: parseInt(data.lowRiskCount) || 0,
    highRiskPercentage:
      total > 0
        ? (((parseInt(data.highRiskCount) || 0) / total) * 100).toFixed(2)
        : 0,
    moderateRiskPercentage:
      total > 0
        ? (((parseInt(data.moderateRiskCount) || 0) / total) * 100).toFixed(2)
        : 0,
    lowRiskPercentage:
      total > 0
        ? (((parseInt(data.lowRiskCount) || 0) / total) * 100).toFixed(2)
        : 0,
  };
};

/**
 * Gets list of students in a module with their risk levels and performance metrics
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} moduleId - The module ID
 * @param {Object} filters - Optional filters {riskLevel, interventionStatus}
 * @returns {Promise<Array>} Array of students with risk and performance data
 */
const getModuleStudents = async (coordinatorId, moduleId, filters = {}) => {
  // Verify coordinator access
  const [access] = await connectDB.query(
    `SELECT coordinatorModuleId FROM CoordinatorModule 
       WHERE coordinatorId = ? AND moduleId = ?`,
    [coordinatorId, moduleId],
  );

  if (access.length === 0) {
    throw forbidden("Coordinator does not have access to this module");
  }

  // Get active academic period
  const [activePeriod] = await connectDB.query(
    `SELECT periodId FROM academicPeriod WHERE isActive = TRUE LIMIT 1`,
  );

  if (activePeriod.length === 0) {
    throw notFound("No active academic period found");
  }

  const periodId = activePeriod[0].periodId;

  // Build query with optional filters
  let query = `
      SELECT 
        s.studentId,
        s.studentNumber,
        u.firstName,
        u.lastName,
        sm.studentModuleId,
        rr.riskLevel,
        rr.attendanceRate,
        rr.submissionRate,
        rr.averageMark,
        i.interventionId,
        i.status as interventionStatus
      FROM StudentModule sm
      INNER JOIN Student s ON sm.studentId = s.studentId
      INNER JOIN Users u ON s.studentId = u.userId
      LEFT JOIN RiskReport rr ON sm.studentModuleId = rr.studentModuleId AND rr.periodId = ?
      LEFT JOIN Intervention i ON sm.studentModuleId = i.studentModuleId AND i.status = 'ACTIVE'
      WHERE sm.moduleId = ?
    `;

  const queryParams = [periodId, moduleId];

  // Add risk level filter
  if (filters.riskLevel) {
    query += ` AND rr.riskLevel = ?`;
    queryParams.push(filters.riskLevel);
  }

  // Add intervention status filter
  if (filters.interventionStatus === "ACTIVE") {
    query += ` AND i.status = 'ACTIVE'`;
  }

  query += ` ORDER BY 
      CASE rr.riskLevel 
        WHEN 'HIGH' THEN 1 
        WHEN 'MODERATE' THEN 2 
        WHEN 'LOW' THEN 3 
        ELSE 4 
      END,
      u.lastName, u.firstName`;

  const [students] = await connectDB.query(query, queryParams);

  return students.map((student) => ({
    studentId: student.studentId,
    studentNumber: student.studentNumber,
    firstName: student.firstName,
    lastName: student.lastName,
    studentModuleId: student.studentModuleId,
    riskLevel: student.riskLevel || "N/A",
    performance: {
      attendanceRate: student.attendanceRate || 0,
      submissionRate: student.submissionRate || 0,
      averageMark: student.averageMark || 0,
    },
    hasActiveIntervention: student.interventionId !== null,
    interventionStatus: student.interventionStatus || null,
  }));
};

/**
 * Gets detailed risk information for a specific student in a module
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} moduleId - The module ID
 * @param {number} studentId - The student's user ID
 * @returns {Promise<Object>} Detailed student risk data
 */
const getStudentRiskDetails = async (coordinatorId, moduleId, studentId) => {
  // Verify coordinator access
  const [access] = await connectDB.query(
    `SELECT coordinatorModuleId FROM CoordinatorModule 
       WHERE coordinatorId = ? AND moduleId = ?`,
    [coordinatorId, moduleId],
  );

  if (access.length === 0) {
    throw forbidden("Coordinator does not have access to this module");
  }

  // Get active academic period
  const [activePeriod] = await connectDB.query(
    `SELECT periodId FROM academicPeriod WHERE isActive = TRUE LIMIT 1`,
  );

  if (activePeriod.length === 0) {
    throw notFound("No active academic period found");
  }

  const periodId = activePeriod[0].periodId;

  // Get student risk details
  const [studentData] = await connectDB.query(
    `SELECT 
        s.studentId,
        s.studentNumber,
        u.firstName,
        u.lastName,
        u.emailAddress,
        u.contactNo,
        sm.studentModuleId,
        m.moduleName,
        m.moduleCode,
        rr.riskLevel,
        rr.attendanceRate,
        rr.submissionRate,
        rr.averageMark,
        rr.calculatedAt
      FROM StudentModule sm
      INNER JOIN Student s ON sm.studentId = s.studentId
      INNER JOIN Users u ON s.studentId = u.userId
      INNER JOIN Module m ON sm.moduleId = m.moduleId
      LEFT JOIN RiskReport rr ON sm.studentModuleId = rr.studentModuleId AND rr.periodId = ?
      WHERE sm.studentId = ? AND sm.moduleId = ?`,
    [periodId, studentId, moduleId],
  );

  if (studentData.length === 0) {
    throw notFound("Student not found in this module");
  }

  return {
    studentId: studentData[0].studentId,
    studentNumber: studentData[0].studentNumber,
    firstName: studentData[0].firstName,
    lastName: studentData[0].lastName,
    emailAddress: studentData[0].emailAddress,
    contactNo: studentData[0].contactNo,
    studentModuleId: studentData[0].studentModuleId,
    module: {
      moduleName: studentData[0].moduleName,
      moduleCode: studentData[0].moduleCode,
    },
    riskLevel: studentData[0].riskLevel || "N/A",
    performance: {
      attendanceRate: studentData[0].attendanceRate || 0,
      submissionRate: studentData[0].submissionRate || 0,
      averageMark: studentData[0].averageMark || 0,
    },
    lastCalculated: studentData[0].calculatedAt,
  };
};

/**
 * Creates an intervention for a student
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} moduleId - The module ID
 * @param {number} studentId - The student's user ID
 * @param {string} content - Intervention content/description
 * @returns {Promise<Object>} Created intervention data
 */
const createIntervention = async (
  coordinatorId,
  moduleId,
  studentId,
  content,
) => {
  // Verify coordinator access
  const [access] = await connectDB.query(
    `SELECT coordinatorModuleId FROM CoordinatorModule 
       WHERE coordinatorId = ? AND moduleId = ?`,
    [coordinatorId, moduleId],
  );

  if (access.length === 0) {
    throw forbidden("Coordinator does not have access to this module");
  }

  // Get studentModuleId
  const [studentModule] = await connectDB.query(
    `SELECT studentModuleId FROM StudentModule 
       WHERE studentId = ? AND moduleId = ?`,
    [studentId, moduleId],
  );

  if (studentModule.length === 0) {
    throw notFound("Student not found in this module");
  }

  const studentModuleId = studentModule[0].studentModuleId;

  // Check if there's already an active intervention
  const [activeIntervention] = await connectDB.query(
    `SELECT interventionId FROM Intervention 
       WHERE studentModuleId = ? AND status = 'ACTIVE'`,
    [studentModuleId],
  );

  if (activeIntervention.length > 0) {
    throw badRequest("Student already has an active intervention");
  }

  // Create the intervention
  const [result] = await connectDB.query(
    `INSERT INTO Intervention (studentModuleId, coordinatorId, content, createdAt, status)
       VALUES (?, ?, ?, NOW(), 'ACTIVE')`,
    [studentModuleId, coordinatorId, content],
  );

  return {
    interventionId: result.insertId,
    studentModuleId,
    coordinatorId,
    content,
    status: "ACTIVE",
    createdAt: new Date(),
  };
};

/**
 * Gets active intervention for a student (if exists)
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} moduleId - The module ID
 * @param {number} studentId - The student's user ID
 * @returns {Promise<Object|null>} Active intervention or null
 */
const getActiveIntervention = async (coordinatorId, moduleId, studentId) => {
  // Verify coordinator access
  const [access] = await connectDB.query(
    `SELECT coordinatorModuleId FROM CoordinatorModule 
       WHERE coordinatorId = ? AND moduleId = ?`,
    [coordinatorId, moduleId],
  );

  if (access.length === 0) {
    throw forbidden("Coordinator does not have access to this module");
  }

  const [intervention] = await connectDB.query(
    `SELECT 
        i.interventionId,
        i.content,
        i.createdAt,
        i.status,
        sm.studentModuleId,
        COUNT(f.followUpId) as followUpCount
      FROM StudentModule sm
      INNER JOIN Intervention i ON sm.studentModuleId = i.studentModuleId
      LEFT JOIN FollowUp f ON i.interventionId = f.interventionId
      WHERE sm.studentId = ? AND sm.moduleId = ? AND i.status = 'ACTIVE'
      GROUP BY i.interventionId`,
    [studentId, moduleId],
  );

  if (intervention.length === 0) {
    return null;
  }

  return {
    interventionId: intervention[0].interventionId,
    studentModuleId: intervention[0].studentModuleId,
    content: intervention[0].content,
    createdAt: intervention[0].createdAt,
    status: intervention[0].status,
    followUpCount: intervention[0].followUpCount,
  };
};

/**
 * Adds a follow-up to an existing intervention
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {number} interventionId - The intervention ID
 * @param {string} content - Follow-up content
 * @param {string} outcome - Outcome: 'IMPROVED', 'NO_CHANGE', 'WORSENED'
 * @returns {Promise<Object>} Created follow-up data
 */
const createFollowUp = async (
  coordinatorId,
  interventionId,
  content,
  outcome,
) => {
  // Verify coordinator owns this intervention
  const [intervention] = await connectDB.query(
    `SELECT interventionId, status FROM Intervention 
       WHERE interventionId = ? AND coordinatorId = ?`,
    [interventionId, coordinatorId],
  );

  if (intervention.length === 0) {
    throw forbidden(
      "Intervention not found or coordinator does not have access",
    );
  }

  // Validate outcome
  const validOutcomes = ["IMPROVED", "NO_CHANGE", "WORSENED"];
  if (!validOutcomes.includes(outcome)) {
    throw badRequest("Invalid outcome value");
  }

  // Create the follow-up
  const [result] = await connectDB.query(
    `INSERT INTO FollowUp (interventionId, content, outcome, createdAt)
       VALUES (?, ?, ?, NOW())`,
    [interventionId, content, outcome],
  );

  // Update intervention status to FOLLOW_UP_DUE if outcome is not IMPROVED
  if (outcome !== "IMPROVED") {
    await connectDB.query(
      `UPDATE Intervention SET status = 'FOLLOW_UP_DUE' WHERE interventionId = ?`,
      [interventionId],
    );
  } else {
    // If improved, consider closing the intervention
    await connectDB.query(
      `UPDATE Intervention SET status = 'CLOSED' WHERE interventionId = ?`,
      [interventionId],
    );
  }

  return {
    followUpId: result.insertId,
    interventionId,
    content,
    outcome,
    createdAt: new Date(),
  };
};

module.exports = {
  getCoordinatorModules,
  getModuleRiskSummary,
  getModuleStudents,
  getStudentRiskDetails,
  createIntervention,
  getActiveIntervention,
  createFollowUp,
};
