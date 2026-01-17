const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authRolesMiddleware");

/**
 * GET /api/me/modules
 * Get all the modules under the specific student currently logged in
 * Note : we need the student's id from the middleware, to use as an identifier to query modules
 */
router.get(
  "/me/student/modules",
  authenticateToken,
  studentController.getStudentsModules,
);

/**
 * GET /assessments/upcoming
 * Get the top 3 upcoming assessments for the authenticated student
 * Ordered by due date (nearest first)
 */
router.get(
  "/assessments/upcoming",
  authenticateToken,
  authorizeRoles("STUDENT"),
  studentController.getUpcomingAssessments,
);

/**
 * GET /student/module-performance
 * Get all modules for the authenticated student with their performance metrics
 * Includes module codes, average marks, and risk levels
 */
router.get(
  "/student/module-performance",
  authenticateToken,
  authorizeRoles("STUDENT"),
  studentController.getStudentModulePerformance,
);

module.exports = router;
