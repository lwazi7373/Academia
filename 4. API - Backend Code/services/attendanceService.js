// Database connection
const connectDB = require("../db/connect");
// For Error handling
const { badRequest, forbidden, notFound } = require("../errors/httpErrors");
/**
 * Create a new class session in the database
 * Verifies lecturer authorization for the module and inserts a new session with expiration time
 * @param {number} moduleId - The ID of the module for which the session is created
 * @param {number} lecturerId - The ID of the lecturer creating the session
 * @param {string} attendanceCode - The generated attendance code for the session
 * @param {string} classType - The type of class (e.g., lecture, tutorial, lab)
 * @returns {Object} Object containing sessionId, attendanceCode, and expiration time
 * @throws {Error} If lecturer is not assigned to the module or database error occurs
 */
const createClassSession = async (
  moduleId,
  lecturerId,
  attendanceCode,
  classType,
) => {
  // Verify if the lecturer teaches this module
  const [assigned] = await connectDB.execute(
    `SELECT 1 FROM LecturerModule WHERE lecturerId = ? AND moduleId = ?`,
    [lecturerId, moduleId],
  );

  if (assigned.length === 0) {
    throw forbidden("Lecturer not assigned to this module");
  }

  // Create the class session
  const [result] = await connectDB.execute(
    `INSERT INTO ClassSession
        (classType, createdAt, expiresAt, attendanceCode, lecturerId, moduleId)
        VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), ?, ?, ?)`, // Attendance code is valid for 5 mins only
    [classType, attendanceCode, lecturerId, moduleId],
  );

  //return
  return {
    sessionId: result.insertId,
    attendanceCode,
    expiresInMinutes: 5,
  };
};

/**
 * Retrieve the active (non-expired) attendance session for a module
 * Fetches the most recent session that hasn't expired yet
 * @param {number} moduleId - The ID of the module
 * @param {number} lecturerId - The ID of the lecturer
 * @returns {Object} Object containing attendanceCode and expiresAt timestamp
 * @throws {Error} If no active session is found or database error occurs
 */
const getActiveSession = async (moduleId, lecturerId) => {
  const [rows] = await connectDB.execute(
    `SELECT attendanceCode, expiresAt
     FROM ClassSession
     WHERE moduleId = ?
       AND lecturerId = ?
       AND expiresAt > NOW()
     ORDER BY createdAt DESC
     LIMIT 1`,
    [moduleId, lecturerId],
  );

  if (rows.length === 0) {
    throw notFound("No active attendance session");
  }

  return rows[0];
};

/**
 * Mark a student's attendance for a class session
 * Validates the attendance code and records the student's presence in the database
 * @param {string} attendanceCode - The attendance code provided by the student
 * @param {number} studentId - The ID of the student marking attendance
 * @throws {Error} If attendance code is invalid/expired or database error occurs
 */

const markStudentAttendance = async (attendanceCode, studentId) => {
  //Find valid session
  const [sessions] = await connectDB.execute(
    `SELECT sessionId
            FROM ClassSession
            WHERE attendanceCode = ?
            AND expiresAt > NOW()`,
    [attendanceCode],
  );

  // Need a way to classify errors (client or server) for controller
  if (sessions.length === 0) {
    throw badRequest("Invalid or expired attendance code");
  }

  const sessionId = sessions[0].sessionId;

  await connectDB.execute(
    `INSERT INTO AttendanceRecord (studentId, sessionId)
        VALUES (?, ?)`,
    [studentId, sessionId],
  );
};

module.exports = {
  createClassSession,
  getActiveSession,
  markStudentAttendance,
};
