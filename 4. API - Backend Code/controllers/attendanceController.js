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
  try {
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
  } catch (error) {
        console.error('Class Session Creation error:', error); // Testing purposes

        const status = error.statusCode || 500;
        res.status(status).json({
        error: status === 500
            ? 'Failed to create class session'
            : error.message, // else its 404, lecturer is not authorized to create session for this module
        });
  }
};

/**
 * Retrieve the active attendance session for a module
 * Gets the current valid attendance session that hasn't expired
 * @param {Object} req - Express request object containing moduleId in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with active session details or error message
 */

const getActiveSession = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const lecturerId = req.user.userId;

    const session = await attendanceService.getActiveSession(
      moduleId,
      lecturerId
    );

    res.status(201).json({msg: "Active class session retrieved", activeSession: session});
  } catch (error) {
    console.error('Get active session error:', error); // Testing purposes

    const status = error.statusCode || 500;
    res.status(status).json({
    error: status === 500
        ? 'Failed to retrieve active session'
        : error.message, // else its 404, there was no specified active session to be found
    }); 
  }
};

/**
 * Mark a student's attendance for a class session
 * Validates the attendance code and records the student's attendance
 * @param {Object} req - Express request object containing attendanceCode in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
const markStudentAttendance = async (req, res) => {
  try {
    const { attendanceCode } = req.body;
    const studentId = req.user.userId;

    await attendanceService.markStudentAttendance(attendanceCode, studentId);

    res.json({ msg: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Mark attendance error:', error); //Testing purposes
    const status = error.statusCode || 500;
    res.status(status).json({
    error: status === 500
      ? 'Failed to mark attendance. Please try again.'
      : error.message, //else its 400, the client sent an invalid code
  });
  }
};

module.exports = {createClassSession, getActiveSession, markStudentAttendance};