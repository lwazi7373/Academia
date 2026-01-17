const moduleService = require("../services/moduleService");
const assessmentService = require("../services/assessmentsService");

/**
 * Fetches all the modukes the student is doing
 * @param {*} req
 * @param {*} res
 * @returns Student modules
 */
const getStudentsModules = async (req, res) => {
  const studentId = req.user.userId; // decoded from the auth Middleware
  const modules = await moduleService.getStudentModules(studentId);
  return res.status(200).json({
    msg: "Modules retrieved successfully",
    modules: modules,
  });
};
/**
 * Fetches the top 3 most recent, upcoming assesssment reagrdless of the modules
 * @param {*} req
 * @param {*} res
 * @return assessements
 */
const getUpcomingAssessments = async (req, res) => {
  const studentId = req.user.userId; // Get the studentId from the auth middleware
  const assessments = await assessmentService.getUpcomingAssessments(studentId);
  res
    .status(200)
    .json({ msg: "Upcoming assessments retrieved", assessments: assessments });
};

/**
 * Gets a student's performance for a module, for all the modules
 * @param {*} req
 * @param {*} res
 * @returns modules, with their performance metrics
 */
const getStudentModulePerformance = async (req, res) => {
  const studentId = req.user.userId; // Get the studentId from the auth middleware
  const modules = await moduleService.getStudentModulePerformance(studentId);
  res.status(200).json({
    msg: `Module Metrics for student :" ${studentId}`,
    modulePerformances: modules,
  });
};

module.exports = {
  getStudentsModules,
  getUpcomingAssessments,
  getStudentModulePerformance,
};
