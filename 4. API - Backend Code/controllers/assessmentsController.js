const assessmentService = require("../services/assessmentsService");
/**
 * Gets an assessment using the assessment Id
 * @param {*} req 
 * @param {*} res 
 * @returns the assessment object
 */
const getAssessmentById = async (req, res) => {
  const lecturerId = req.user.userId;
  const assessmentId = req.params.assessmentId;

  const assessment = await assessmentService.getAssessmentById(assessmentId, lecturerId);
  res.status(200).json({ msg: "Assessment retrieved", assessment });
};

/**
 * Creates a new assessment for a particular module
 * @param {*} req
 * @param {*} res
 * @returns the created assessment
 */
const createAnAssessment = async (req, res) => {
  const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
  const moduleId = req.params.moduleId;
  const { assessmentName, totalMark, weighting, dueDate } = req.body;

  const assessment = await assessmentService.createAssessment(
    moduleId,
    lecturerId,
    assessmentName,
    totalMark,
    weighting,
    dueDate,
  );
  res
    .status(201)
    .json({ msg: "Assessment Successfully created", assessment: assessment });
};

/**
 * Updates the details of the assessments for a particular module
 * @param {*} req
 * @param {*} res
 * @returns the updated assessment
 */
const updateAnAssessment = async (req, res) => {
  const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
  const assessmentId = req.params.assessmentId;
  const { assessmentName, totalMark, weighting, dueDate } = req.body;

  const updatedAssessmentId = await assessmentService.updateAssessment(
    assessmentId,
    lecturerId,
    assessmentName,
    totalMark,
    weighting,
    dueDate,
  );
  res
    .status(201)
    .json({ msg: `Assessment: ${updatedAssessmentId} has been updated` });
};

/**
 * Removes an assessment from a module
 * @param {*} req
 * @param {*} res
 * @returns the Id of the assessment that has been deleted
 */
const deleteAnAssessment = async (req, res) => {
  const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
  const assessmentId = req.params.assessmentId;

  const deletedAssessmentId = await assessmentService.deleteAssessment(
    assessmentId,
    lecturerId,
  );
  res
    .status(201)
    .json({ msg: `Assessment: ${deletedAssessmentId} has been deleted` });
};

/**
 * Gets all the assessments the of the module the lecturer is lecturing
 * @param {*} req
 * @param {*} res
 * @returns the assessments
 */
const getLecturerModuleAssessments = async (req, res) => {
  const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
  const moduleId = req.params.moduleId;
  const assessments = await assessmentService.getLecturerModuleAssessments(
    moduleId,
    lecturerId,
  );
  res
    .status(201)
    .json({
      msg: "Assessments Successfully retrieved",
      assessments: assessments,
    });
};

/**
 * Gets all the assessments of that particular module the student is doing (together with extra details)
 * @param {*} req
 * @param {*} res
 */
const getStudentModuleAssessments = async (req, res) => {
  const studentId = req.user.userId; //get the studentId's id from the auth middleware
  const moduleId = req.params.moduleId;
  const assessments = await assessmentService.getStudentModuleAssessments(
    moduleId,
    studentId,
  );
  res
    .status(201)
    .json({
      msg: "Assessments Successfully retrieved",
      assessments: assessments,
    });
};

/**
 * Allows for a lecturer to upload the marks of an assessment of all the students of that module.
 * @param {*} req
 * @param {*} res
 * @returns  the result (which will have descriptive details of what happened)
 */
const uploadOrUpdateStudentMarks = async (req, res) => {
  const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
  const assessmentId = req.params.assessmentId;

  const { marksData } = req.body;
  const result = await assessmentService.uploadStudentMarks(
    assessmentId,
    lecturerId,
    marksData,
  );

  res.status(201).json({ msg: "Marks uploaded successfully", result: result });
};

module.exports = {
  getAssessmentById,
  createAnAssessment,
  updateAnAssessment,
  deleteAnAssessment,
  uploadOrUpdateStudentMarks,
  getStudentModuleAssessments,
  getLecturerModuleAssessments,
};
