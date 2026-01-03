const express = require('express');
const router = express.Router();

const coordinatorController = require("../controllers/CoordinatorController"); // Still to write controller
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRoles = require("../middleware/authRolesMiddleware");

/**
 * GET /api/coordinator/modules
 * Get all the modules under the specific Coordinator currently logged in 
 * {coordinatorId} 
 */
router.get('/coordinator/modules', authenticateToken); // Coordinator is responsibe for one module, but I will just leave this, incase it changes 

/**
 * GET /api/coordinator/modules/:moduleId/risk-summary
 * Get Module risk summary (counts & percentages) + total students,  high / moderate / low risk counts
 * {coordinatorId} + {moduleId}
 */
router.get('/coordinator/modules/:moduleId/risk-summary', authenticateToken, authorizeRoles('COORDINATOR'));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * GET /api/coordinator/modules/:moduleId/students
 * Get the list of students, together with their (name + studentnumber + risklevel + performance)
 * Where performance is the attendanceRate + submissionRate + averageMark
 * {coordinatorId} + {moduleId}
 */
router.get('/coordinator/modules/:moduleId/students', authenticateToken, authorizeRoles('COORDINATOR'));

/**
 * GET /api/coordinator/modules/:moduleId/students
 * Get the list of students, together with their (name + studentnumber + risklevel + performance)
 * Where performance is the attendanceRate + submissionRate + averageMark
 * {coordinatorId} + {moduleId} 
 * With optional query params {?riskLevel=HIGH} + {?riskLevel=MODERATE} + {?riskLevel=LOW} + {?interventionStatus=ACTIVE]
 */
router.get('/coordinator/modules/:moduleId/students/?riskLevel=LOW', authenticateToken, authorizeRoles('COORDINATOR'));
router.get('/coordinator/modules/:moduleId/students/?riskLevel=MODERATE', authenticateToken, authorizeRoles('COORDINATOR'));
router.get('/coordinator/modules/:moduleId/students/?riskLevel=HIGH', authenticateToken, authorizeRoles('COORDINATOR'));
router.get('/coordinator/modules/:moduleId/students/?interventionStatus=ACTIVE', authenticateToken, authorizeRoles('COORDINATOR'));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * GET /api/coordinator/modules/:moduleId/students/:studentId/risk
 * Get detailed risk for one student in module
 * {coordinatorId} + {moduleId} + {studentId}
 */
router.get('/coordinator/modules/:moduleId/students/:studentId/risk', authenticateToken, authorizeRoles('COORDINATOR'));

/**
 * POST /api/coordinator/modules/:moduleId/students/:studentId/interventions
 * Create an intervention for a student
 * {coordinatorId} + {moduleId} + {studentId}
 */
router.post('/coordinator/modules/:moduleId/students/:studentId/interventions', authenticateToken, authorizeRoles('COORDINATOR'));

/**
 * GET /api/coordinator/modules/:moduleId/students/:studentId/interventions/active
 * Get active intervention (if exists)
 * {coordinatorId} + {moduleId} + {studentId}
 */
router.post('/coordinator/modules/:moduleId/students/:studentId/interventions/active', authenticateToken, authorizeRoles('COORDINATOR'));

/**
 * POST /api/coordinator/interventions/:interventionId/follow-ups
 * Add a follow up 
 * {coordinatorId} + {interventionId}
 */
router.post('/coordinator/interventions/:interventionId/follow-ups', authenticateToken, authorizeRoles('COORDINATOR'));

module.exports = router;