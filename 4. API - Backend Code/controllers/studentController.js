const moduleService = require("../services/moduleService");
const assessmentService = require("../services/assessmentsService");

//Gets all modules assigned to a student
const getStudentsModules = async (req, res) => {
    try {
        const studentId = req.user.userId; // decoded from the auth Middleware
        const modules = await moduleService.getStudentModules(studentId);
        return res.status(200).json({
            code: "Successful",
            msg: "Modules retrieved successfully",
            data: {
                modules: modules
            }
        });
    } catch (error) {
        console.error('Error getting students modules:', error); // Testing purposes
        res.status(500).json({ error: error.message });
    }
}

const getUpcomingAssessments = async (req, res) => {
    try {
        const studentId = req.user.userId; // Get the studentId from the auth middleware
        const assessments = await assessmentService.getUpcomingAssessments(studentId);
        res.status(200).json({ code: "Successful", assessments });
    } catch (error) {
        console.error('Fetching upcoming assessments error:', error);
        res.status(500).json({ error: error.message });
    }
};

const getStudentModulePerformance = async (req, res) => {
    try {
        const studentId = req.user.userId; // Get the studentId from the auth middleware
        const modules = await moduleService.getStudentModulePerformance(studentId);
        res.status(200).json({ 
            code: "Successful",
            count: modules.length,
            msg : `Module Metrics for student :" ${studentId}`,
            modules 
        });
    } catch (error) {
        console.error('Fetching student module performance error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStudentsModules, getUpcomingAssessments, getStudentModulePerformance}