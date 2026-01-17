const riskService = require("../services/riskService");

/**
 * Note: Coordinators in this system will really only be responsible for one module
 * This controller is really just for, a moment where for whatever reason, I decided that they can handle more than one
 * @param {*} req
 * @param {*} res
 * @returns coordinators modules
 */
const getCoordinatorModules = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const modules = await riskService.getCoordinatorModules(coordinatorId);
  return res.status(200).json({
    msg: "Modules retrieved successfully",
    modules: modules,
  });
};

/**
 * Gets the risk summary of the module the coordinator is responsible for (summary stats basically)
 * @param {*} req
 * @param {*} res
 * @returns risk summary of the module
 */
const getModuleRiskSummary = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { moduleId } = req.params;
  const riskSummary = await riskService.getModuleRiskSummary(
    coordinatorId,
    moduleId,
  );
  return res.status(200).json({
    msg: "Module risk summary retrieved successfully",
    riskSummary: riskSummary,
  });
};

/**
 * Gets all the students of this module, or the students filtered by risk or intervention status
 * @param {*} req
 * @param {*} res
 * @returns students
 */
const getModuleStudents = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { moduleId } = req.params;

  // Extract query params for filtering (optional)
  const filters = {};
  if (req.query.riskLevel) {
    filters.riskLevel = req.query.riskLevel.toUpperCase(); // Ensure uppercase (HIGH, MODERATE, LOW)
  }
  if (req.query.interventionStatus) {
    filters.interventionStatus = req.query.interventionStatus.toUpperCase(); // ACTIVE
  }

  const students = await riskService.getModuleStudents(
    coordinatorId,
    moduleId,
    filters,
  );
  return res.status(200).json({
    msg: "Module students retrieved successfully",
    students: students,
  });
};

/**
 * Gets the risk details of a particular(single) student
 * @param {*} req
 * @param {*} res
 * @returns studentRiskDetails
 */
const getStudentRiskDetails = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { moduleId, studentId } = req.params;
  const studentRiskDetails = await riskService.getStudentRiskDetails(
    coordinatorId,
    moduleId,
    studentId,
  );
  return res.status(200).json({
    msg: "Student risk details retrieved successfully",
    studentRiskDetails: studentRiskDetails,
  });
};

/**
 * Creates the intervention for the student at risk
 * @param {*} req
 * @param {*} res
 * @returns object with intervention related details
 */
const createIntervention = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { moduleId, studentId } = req.params;
  const { content } = req.body;

  // Validate content
  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Intervention content is required" });
  }

  const result = await riskService.createIntervention(
    coordinatorId,
    moduleId,
    studentId,
    content,
  );
  return res.status(201).json({
    msg: "Intervention created successfully",
    result: result,
  });
};

/**
 * Gets the intervention requested of the student who had it
 * @param {*} req
 * @param {*} res
 * @returns intervention
 */
const getActiveIntervention = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { moduleId, studentId } = req.params;
  const intervention = await riskService.getActiveIntervention(
    coordinatorId,
    moduleId,
    studentId,
  );

  // Return 404 if no active intervention found
  if (!intervention) {
    return res.status(404).json({
      msg: "No active intervention found for this student",
    });
  }

  return res.status(200).json({
    msg: "Active intervention retrieved successfully",
    intervention: intervention,
  });
};

/**
 * Creates the follow up for review of how the student performed after intervention
 * @param {*} req
 * @param {*} res
 * @returns object with follow up related details
 */
const createFollowUp = async (req, res) => {
  const coordinatorId = req.user.userId; // decoded from the auth Middleware
  const { interventionId } = req.params;
  const { content, outcome } = req.body;

  const result = await riskService.createFollowUp(
    coordinatorId,
    interventionId,
    content,
    outcome,
  );
  return res.status(201).json({
    msg: "Follow-up created successfully",
    result: result,
  });
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
