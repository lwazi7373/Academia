const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authRolesMiddleware");

/**
 * POST /api/attendance/sessions
 * Generate the attendance code and Create classSession
 * Params: { moduleId } , Body: { classType } , Middleware: { lecturerId }
 */
router.post(
  "/modules/:moduleId/attendance-sessions",
  authenticateToken,
  authorizeRoles("LECTURER"),
  attendanceController.createClassSession,
);

/**
 * GET /api/attendance/view
 * Get the generated attendance code
 * Params: { moduleId } , Middleware: { lecturerId }
 */
router.get(
  "/modules/:moduleId/attendance-sessions/active",
  authenticateToken,
  authorizeRoles("LECTURER"),
  attendanceController.getActiveSession,
);

/**
 * POST /api/attendance/submit
 * Submit the generated class attendance code
 * Body: { attendanceCode } , Middleware: { studentId }
 */
router.post(
  "/attendance/submit",
  authenticateToken,
  authorizeRoles("STUDENT"),
  attendanceController.markStudentAttendance,
);

module.exports = router;
