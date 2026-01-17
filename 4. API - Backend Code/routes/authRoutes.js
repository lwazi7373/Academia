const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
//const authorizeRoles = require("../middleware/authRolesMiddleware");

/**
 * GET /api/me
 * Get the current user 
 */
router.get('/me', authenticateToken, authController.getMe);

/**
 * POST /api/auth/login
 * Authenticate user and receive JWT token
 * Body: { identifierNumber, userPassword }
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/register/step1
 * Step 1: Create base user account and generate student/staff number
 * Body: { firstName, lastName, idNumber, emailAddress, userPassword, 
 *         contactNo, gender, userRole, title, isActive }
 * Returns: { userId, studentNumber/staffNumber, role(s) }
 */
router.post('/register/step1', authController.registerStep1);

/**
 * POST /api/auth/register/student/step2
 * Step 2 (Students): Complete student registration with qualification
 * Body: { userId, studentNumber, qualificationName, yearOfStudy, 
 *         semesterNo, levelOfEducation }
 * Returns: { student, modulesAssigned, modules }
 */
router.post('/register/student/step2', authController.registerStep2Student);

/**
 * Get all the departments in the database (available for assignment to lecturer when registering them) 
 */
router.get('/departments', authController.getAllDepartments);

/**
 * Get all qual;ifications in the database (available for assignment to student when registering them )
 */
router.get('/qualifications', authController.getAllQualifications);

/**
 * POST /api/auth/register/staff/step2
 * Step 2 (Staff): Assign department to staff member
 * Body: { userId, staffNumber, departmentId, userRole }
 * Returns: { staff }
 */
router.post('/register/staff/step2', authController.registerStep2Staff);

/**
 * Still Step 2 of staff registration
 * Returns: { modules }
 */
router.get('/modules/department/:departmentId', authController.getDepartmentModules);

/**
 * POST /api/auth/register/staff/step3
 * Step 3 (Staff): Assign modules to Lecturer/Coordinator
 * Body: { userId, userRole, moduleIds }
 * Returns: { modulesAssigned, modules }
 */
router.post('/register/staff/step3', authController.registerStep3Staff);

/**
 * DEV ONLY - could not find a shorter/easier way to do this
 * PUT /api/auth/update-password
 * Update a user's password using student/staff number
 * Body: { identifierNumber, newPassword }
 */
router.put('/update-password', authController.updateUserPassword);



module.exports = router;
