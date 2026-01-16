const moduleService = require("../services/moduleService");
const assessmentService = require("../services/assessmentsService");

//Gets all modules assigned to a student
const getStudentsModules = async (req, res) => {

        const studentId = req.user.userId; // decoded from the auth Middleware
        const modules = await moduleService.getStudentModules(studentId);
        return res.status(200).json({
            msg: "Modules retrieved successfully",
            modules: modules
        });
   
}

const getUpcomingAssessments = async (req, res) => {

        const studentId = req.user.userId; // Get the studentId from the auth middleware
        const assessments = await assessmentService.getUpcomingAssessments(studentId);
        res.status(200).json({ msg: "Upcoming assessments retrieved", assessments: assessments });
   
};

const getStudentModulePerformance = async (req, res) => {

        const studentId = req.user.userId; // Get the studentId from the auth middleware
        const modules = await moduleService.getStudentModulePerformance(studentId);
        res.status(200).json({ 
            msg : `Module Metrics for student :" ${studentId}`,
            modulePerformances: modules 
        });
 
};

module.exports = { getStudentsModules, getUpcomingAssessments, getStudentModulePerformance}