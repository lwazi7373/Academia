const express = require("express");
const router = express.Router();

const assessmentsController = require("../controllers/assessmentsController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authRolesMiddleware");


/**
 * Get an assessment using the assessments Id  
 */
router.get('/assessments/:assessmentId', authenticateToken, assessmentsController.getAssessmentById);

/**
 * POST /assessments/:moduleId/create
 * Create an assessment for a particular module
 * Body: { assessmentName, totalMark, weighting, dueDate }
 */
router.post(
  "/assessments/:moduleId/create",
  authenticateToken,
  authorizeRoles("LECTURER"),
  assessmentsController.createAnAssessment,
);

/**
 * POST /assessments/:assessmentId/update
 * Update an assessment
 * Body: { assessmentName, totalMark, weighting, dueDate }
 */
router.patch(
  "/assessments/:assessmentId/update",
  authenticateToken,
  authorizeRoles("LECTURER"),
  assessmentsController.updateAnAssessment,
);

/**
 * POST /assessments/:assessmentId/delete
 * Update an assessment
 */
router.delete(
  "/assessments/:assessmentId/delete",
  authenticateToken,
  authorizeRoles("LECTURER"),
  assessmentsController.deleteAnAssessment,
);

/**
 * GET /assessments/:moduleId/semester-assessments
 * Get the list of assessments available for lecturer
 */
router.get(
  "/assessments/:moduleId/semester-assessments",
  authenticateToken,
  authorizeRoles("LECTURER"),
  assessmentsController.getLecturerModuleAssessments,
);

/**
 * GET /assessments/:moduleId/semester-assessments
 * Get the list of assessments and corresponding marks available for student
 */
router.get(
  "/assessments/:moduleId/assessments-marks",
  authenticateToken,
  authorizeRoles("STUDENT"),
  assessmentsController.getStudentModuleAssessments,
);

/**
 * POST /assessments/:assessmentId/upload
 * upload or update students marks for a particular assessment 
 * body {marksData[] array} -> 
 * e.g) "marksData": [
    {
      "studentId": 13,
      "mark": 79,
      "submission": true
    },
    {
      "studentId": 14,
      "mark": 58,
      "submission": true
    }
  ]
 */
router.post(
  "/assessments/:assessmentId/upload-marks",
  authenticateToken,
  authorizeRoles("LECTURER"),
  assessmentsController.uploadOrUpdateStudentMarks,
);

module.exports = router;
