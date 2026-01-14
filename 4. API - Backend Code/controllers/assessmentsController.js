const assessmentService = require("../services/assessmentsService");

const createAnAssessment = async (req, res) => {
  try {
        const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
        const moduleId = req.params.moduleId;  
        const {assessmentName, totalMark, weighting, dueDate} = req.body;

        const assessment = await assessmentService.createAssessment(moduleId, lecturerId, assessmentName, totalMark, weighting, dueDate);
        res.status(201).json({msg: "Assessment Successfully created", assessment: assessment});
  } catch (error) {
       console.error('Creating assessment error:', error); // Testing purposes
       const status = error.statusCode || 500;
       res.status(status).json({error: error.message || 'Internal server error'});
  }
};

const updateAnAssessment = async (req, res) => {
  try {
        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId; 
        const {assessmentName, totalMark, weighting, dueDate} = req.body;

        const updatedAssessmentId = await assessmentService.updateAssessment(assessmentId, lecturerId, assessmentName, totalMark, weighting, dueDate);
        res.status(201).json({code: "Successful", msg: `Assessment: ${updatedAssessmentId} has been updated`});
  } catch (error) {
        console.error('Updating assessment error:', error); // Testing purposes
        const status = error.statusCode || 500;
        res.status(status).json({error: error.message || 'Internal server error'});
  }
};

const deleteAnAssessment = async (req, res) => {
  try {
        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId; 

        const deletedAssessmentId = await assessmentService.deleteAssessment(assessmentId, lecturerId);
        res.status(201).json({code: "Successful", msg: `Assessment: ${deletedAssessmentId} has been deleted`});
  } catch (error) {
        console.error('Deleting assessment error:', error); // Testing purposes
        const status = error.statusCode || 500;
        res.status(status).json({error: error.message || 'Internal server error'});
  }
};

const getLecturerModuleAssessments = async (req, res) => {
  try {
    const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
    const moduleId = req.params.moduleId; 
    const assessments = await assessmentService.getLecturerModuleAssessments(moduleId, lecturerId);
    res.status(201).json({msg: "Assessments Successfully retrieved", assessments: assessments});
  } catch (error) {
        console.error('Fetching assessments error:', error); // Testing purposes
        const status = error.statusCode || 500;
        res.status(status).json({error: error.message || 'Internal server error'});
  }
};

const getStudentModuleAssessments = async (req, res) => {
  try {
    const studentId = req.user.userId; //get the studentId's id from the auth middleware
    const moduleId = req.params.moduleId; 
    const assessments = await assessmentService.getStudentModuleAssessments(moduleId, studentId);
    res.status(201).json({msg: "Assessments Successfully retrieved", assessments: assessments});
  } catch (error) {
        console.error('Fetching assessments error:', error); // Testing purposes
        const status = error.statusCode || 500;
        res.status(status).json({error: error.message || 'Internal server error'});
  }
};

const uploadOrUpdateStudentMarks = async (req, res) => {
  try {
        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId;

        const {marksData} = req.body;
        const result = await assessmentService.uploadStudentMarks(assessmentId, lecturerId, marksData);

        res.status(201).json({msg: "Marks uploaded successfully", result: result});
  } catch (error) {
        console.error('Updating or Insertion  of assessment marks error:', error); // Testing purposes
        const status = error.statusCode || 500;
        res.status(status).json({error: error.message || 'Internal server error'});
  }
};

module.exports = {
  createAnAssessment,
  updateAnAssessment,
  deleteAnAssessment,
  uploadOrUpdateStudentMarks,
  getStudentModuleAssessments,
  getLecturerModuleAssessments,
};
