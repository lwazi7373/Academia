const express = require('express');
const router = express.Router();

const assessmentsController = require("../controllers/assessmentsController");
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require("../middleware/authRolesMiddleware");

router.post(
  '/assessments/:moduleId/create',
  authenticateToken,
  authorizeRoles('LECTURER'),
  assessmentsController.createAnAssessment
);

router.post(
  '/assessments/:assessmentId/update',
  authenticateToken,
  authorizeRoles('LECTURER'),
  assessmentsController.updateAnAssessment
);

router.post(
  '/assessments/:assessmentId/delete',
  authenticateToken,
  authorizeRoles('LECTURER'),
  assessmentsController.deleteAnAssessment
);

router.post(
  '/assessments/:assessmentId/semester-assessments',
  authenticateToken,
  authorizeRoles('LECTURER'),
  assessmentsController.getLecturerModuleAssessments
);

router.post(
  '/assessments/:moduleId/assessments-marks',
  authenticateToken,
  authorizeRoles('STUDENT'),
  assessmentsController.getStudentModuleAssessments
);

router.post(
  '/assessments/:assessmentId/upload',
  authenticateToken,
  authorizeRoles('LECTURER'),
  assessmentsController.uploadOrUpdateStudentMarks
);


module.exports = router;