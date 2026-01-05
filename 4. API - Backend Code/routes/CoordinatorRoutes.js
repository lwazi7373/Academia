const express = require("express");
const router = express.Router();

const coordinatorController = require("../controllers/CoordinatorController");
const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authRolesMiddleware");

/**
 * GET /api/coordinator/modules
 * Get all the modules under the specific Coordinator currently logged in
 * Extracts: {coordinatorId} from JWT token
 * Returns: Array of modules assigned to coordinator
 */
router.get(
  "/coordinator/modules",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.getCoordinatorModules
);

/**
 * GET /api/coordinator/modules/:moduleId/risk-summary
 * Get Module risk summary (counts & percentages) + total students, high / moderate / low risk counts
 * Extracts: {coordinatorId} from JWT token
 * Params: {moduleId}
 * Returns: Risk summary with totalStudents, highRiskCount, moderateRiskCount, lowRiskCount, and percentages
 */
router.get(
  "/coordinator/modules/:moduleId/risk-summary",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.getModuleRiskSummary
);

/**
 * GET /api/coordinator/modules/:moduleId/students
 * Get the list of students, together with their (name + studentNumber + riskLevel + performance)
 * Where performance is the attendanceRate + submissionRate + averageMark
 * Extracts: {coordinatorId} from JWT token
 * Params: {moduleId}
 * Query Params (OPTIONAL):
 *   - ?riskLevel=HIGH (or MODERATE or LOW) - Filter by risk level
 *   - ?interventionStatus=ACTIVE - Filter students with active interventions
 *   - Can combine: ?riskLevel=HIGH&interventionStatus=ACTIVE
 * Returns: Array of students with risk and performance data
 *
 * Examples:
 *   GET /api/coordinator/modules/5/students
 *   GET /api/coordinator/modules/5/students?riskLevel=HIGH
 *   GET /api/coordinator/modules/5/students?riskLevel=MODERATE&interventionStatus=ACTIVE
 */
router.get(
  "/coordinator/modules/:moduleId/students",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.getModuleStudents
);

/**
 * GET /api/coordinator/modules/:moduleId/students/:studentId/risk
 * Get detailed risk information for one student in module (name + studentNumber + riskLevel + performance + contact info)
 * Where performance is the attendanceRate + submissionRate + averageMark
 * Extracts: {coordinatorId} from JWT token
 * Params: {moduleId}, {studentId}
 * Returns: Detailed student risk data including contact information and module details
 */
router.get(
  "/coordinator/modules/:moduleId/students/:studentId/risk",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.getStudentRiskDetails
);

/**
 * POST /api/coordinator/modules/:moduleId/students/:studentId/interventions
 * Create an intervention for a student
 * Extracts: {coordinatorId} from JWT token
 * Params: {moduleId}, {studentId}
 * Body: {content} - Intervention description/plan
 * Returns: Created intervention with interventionId, status, and createdAt
 * Note: Will fail if student already has an active intervention (409 Conflict)
 */
router.post(
  "/coordinator/modules/:moduleId/students/:studentId/interventions",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.createIntervention
);

/**
 * GET /api/coordinator/modules/:moduleId/students/:studentId/interventions/active
 * Get active intervention for a student (if exists)
 * Extracts: {coordinatorId} from JWT token
 * Params: {moduleId}, {studentId}
 * Returns: Active intervention details or 404 if no active intervention exists
 */
router.get(
  "/coordinator/modules/:moduleId/students/:studentId/interventions/active",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.getActiveIntervention
);

/**
 * POST /api/coordinator/interventions/:interventionId/follow-ups
 * Add a follow-up to an existing intervention
 * Extracts: {coordinatorId} from JWT token
 * Params: {interventionId}
 * Body:
 *   - {content} - Follow-up notes/description
 *   - {outcome} - One of: 'IMPROVED', 'NO_CHANGE', 'WORSENED'
 * Returns: Created follow-up with followUpId
 * Note:
 *   - If outcome is 'IMPROVED', intervention status changes to 'CLOSED'
 *   - If outcome is 'NO_CHANGE' or 'WORSENED', intervention status changes to 'FOLLOW_UP_DUE'
 */
router.post(
  "/coordinator/interventions/:interventionId/follow-ups",
  authenticateToken,
  authorizeRoles("COORDINATOR"),
  coordinatorController.createFollowUp
);

module.exports = router;
