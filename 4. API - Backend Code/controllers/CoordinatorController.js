const riskService = require("../services/riskService");

const getCoordinatorModules = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const modules = await riskService.getCoordinatorModules(coordinatorId);
        return res.status(200).json({
            msg: "Modules retrieved successfully",
            data: modules
        });
    } catch (error) {
        console.error('Error getting coordinator modules:', error);
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const getModuleRiskSummary = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const { moduleId } = req.params;
        const riskSummary = await riskService.getModuleRiskSummary(coordinatorId, moduleId);
        return res.status(200).json({
            msg: "Module risk summary retrieved successfully",
            data: riskSummary
        });
    } catch (error) {
        console.error('Error getting module risk summary:', error);
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const getModuleStudents = async (req, res) => {
    try {
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
        
        const students = await riskService.getModuleStudents(coordinatorId, moduleId, filters);
        return res.status(200).json({
            msg: "Module students retrieved successfully",
            data: students
        });
    } catch (error) {
        console.error('Error getting module students:', error);
        return res.status(500).json({ 
            code: "ERROR",
            error: error.message 
        });
    }
};

const getStudentRiskDetails = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const { moduleId, studentId } = req.params;
        const studentRiskDetails = await riskService.getStudentRiskDetails(coordinatorId, moduleId, studentId);
        return res.status(200).json({
            msg: "Student risk details retrieved successfully",
            data: studentRiskDetails
        });
    } catch (error) {
        console.error(`Error getting student's risk details:`, error);
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const createIntervention = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const { moduleId, studentId } = req.params;
        const { content } = req.body;
        
        // Validate content
        if (!content || content.trim() === '') {
            return res.status(400).json({error: "Intervention content is required"});
        }
        
        const result = await riskService.createIntervention(coordinatorId, moduleId, studentId, content);
        return res.status(201).json({
            msg: "Intervention created successfully",
            data: result
        });
    } catch (error) {
        console.error(`Error creating intervention:`, error);
        
        // Handle specific error cases
        if (error.message.includes('already has an active intervention')) {
            return res.status(409).json({
                error: error.message
            });
        }
        
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const getActiveIntervention = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const { moduleId, studentId } = req.params;
        const intervention = await riskService.getActiveIntervention(coordinatorId, moduleId, studentId);
        
        // Return 404 if no active intervention found
        if (!intervention) {
            return res.status(404).json({
                msg: "No active intervention found for this student"
            });
        }
        
        return res.status(200).json({
            msg: "Active intervention retrieved successfully",
            data: intervention
        });
    } catch (error) {
        console.error(`Error retrieving intervention:`, error);
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

const createFollowUp = async (req, res) => {
    try {
        const coordinatorId = req.user.userId; // decoded from the auth Middleware
        const { interventionId } = req.params;
        const { content, outcome } = req.body;
        
        // Validate input
        if (!content || content.trim() === '') {
            return res.status(400).json({
                error: "Follow-up content is required"
            });
        }
        
        if (!outcome) {
            return res.status(400).json({
                error: "Outcome is required (IMPROVED, NO_CHANGE, WORSENED)"
            });
        }
        
        const result = await riskService.createFollowUp(coordinatorId, interventionId, content, outcome);
        return res.status(201).json({
            msg: "Follow-up created successfully",
            data: result
        });
    } catch (error) {
        console.error(`Error creating follow-up:`, error);
        
        // Handle invalid outcome error
        if (error.message.includes('Invalid outcome')) {
            return res.status(400).json({
                error: error.message
            });
        }
        
        return res.status(500).json({ 
            error: error.message 
        });
    }
};

module.exports = {
    getCoordinatorModules,
    getModuleRiskSummary,
    getModuleStudents,
    getStudentRiskDetails,
    createIntervention,
    getActiveIntervention,
    createFollowUp
};