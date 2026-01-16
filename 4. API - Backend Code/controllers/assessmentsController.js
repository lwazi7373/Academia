const assessmentService = require("../services/assessmentsService");

const createAnAssessment = async (req, res) => {

        const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
        const moduleId = req.params.moduleId;  
        const {assessmentName, totalMark, weighting, dueDate} = req.body;

        const assessment = await assessmentService.createAssessment(moduleId, lecturerId, assessmentName, totalMark, weighting, dueDate);
        res.status(201).json({msg: "Assessment Successfully created", assessment: assessment});

};

const updateAnAssessment = async (req, res) => {

        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId; 
        const {assessmentName, totalMark, weighting, dueDate} = req.body;

        const updatedAssessmentId = await assessmentService.updateAssessment(assessmentId, lecturerId, assessmentName, totalMark, weighting, dueDate);
        res.status(201).json({msg: `Assessment: ${updatedAssessmentId} has been updated`});

};

const deleteAnAssessment = async (req, res) => {

        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId; 

        const deletedAssessmentId = await assessmentService.deleteAssessment(assessmentId, lecturerId);
        res.status(201).json({msg: `Assessment: ${deletedAssessmentId} has been deleted`});

};

const getLecturerModuleAssessments = async (req, res) => {

    const lecturerId = req.user.userId; // get the lecturerId's id from the auth middleware
    const moduleId = req.params.moduleId; 
    const assessments = await assessmentService.getLecturerModuleAssessments(moduleId, lecturerId);
    res.status(201).json({msg: "Assessments Successfully retrieved", assessments: assessments});

};

const getStudentModuleAssessments = async (req, res) => {

    const studentId = req.user.userId; //get the studentId's id from the auth middleware
    const moduleId = req.params.moduleId; 
    const assessments = await assessmentService.getStudentModuleAssessments(moduleId, studentId);
    res.status(201).json({msg: "Assessments Successfully retrieved", assessments: assessments});

};

const uploadOrUpdateStudentMarks = async (req, res) => {
  
        const lecturerId = req.user.userId; //get the lecturerId's id from the auth middleware
        const assessmentId = req.params.assessmentId;

        const {marksData} = req.body;
        const result = await assessmentService.uploadStudentMarks(assessmentId, lecturerId, marksData);

        res.status(201).json({msg: "Marks uploaded successfully", result: result});

};

module.exports = {
  createAnAssessment,
  updateAnAssessment,
  deleteAnAssessment,
  uploadOrUpdateStudentMarks,
  getStudentModuleAssessments,
  getLecturerModuleAssessments,
};
