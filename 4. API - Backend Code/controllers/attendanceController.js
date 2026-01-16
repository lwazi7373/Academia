const attendanceService = require("../services/attendanceService");

/**
 * A function to simply generate a random six character code
 * @returns six character code 
 */
const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
};

/**
 * Create a new class session with attendance code
 * Generates a random attendance code and creates a session for a specific module
 * @param {Object} req - Express request object containing classType in body and moduleId in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created session details or error message
 */
const createClassSession = async (req, res) => {

        const { classType } = req.body;
        const moduleId = req.params.moduleId; 
        const lecturerId = req.user.userId;  // get the lecturer's id from the auth middleware
        const attendanceCode = generateRandomCode(); //Generate the attendance code for the class session 

        const session = await attendanceService.createClassSession(
            moduleId,
            lecturerId,
            attendanceCode,
            classType  
        );
        res.status(201).json({msg: "Class Session Created - now active", createdSession: session});
};

/**
 * Retrieve the active attendance session for a module
 * Gets the current valid attendance session that hasn't expired
 * @param {Object} req - Express request object containing moduleId in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with active session details or error message
 */

const getActiveSession = async (req, res) => {

    const { moduleId } = req.params;
    const lecturerId = req.user.userId;

    const session = await attendanceService.getActiveSession(
      moduleId,
      lecturerId
    );

    res.status(201).json({msg: "Active class session retrieved", activeSession: session});
  
};

/**
 * Mark a student's attendance for a class session
 * Validates the attendance code and records the student's attendance
 * @param {Object} req - Express request object containing attendanceCode in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
const markStudentAttendance = async (req, res) => {
    const { attendanceCode } = req.body;
    const studentId = req.user.userId;

    await attendanceService.markStudentAttendance(attendanceCode, studentId);

    res.json({ msg: 'Attendance marked successfully' });
 
};

module.exports = {createClassSession, getActiveSession, markStudentAttendance};