//Database connection
const connectDB = require("../db/connect");
// For error handling
const { badRequest, forbidden, notFound } = require("../errors/httpErrors");
/**
 * Create a new assessment for a module
 * Verifies lecturer authorization and creates assessment record
 * @param {number} moduleId - The ID of the module
 * @param {number} lecturerId - The ID of the lecturer creating the assessment
 * @param {string} assessmentName - Name of the assessment
 * @param {number} totalMark - Total marks for the assessment
 * @param {number} weighting - Percentage weighting of the assessment (0-100)
 * @param {string} dueDate - Due date for the assessment (YYYY-MM-DD format)
 * @returns {Object} Object containing the created assessment details
 * @throws {Error} If lecturer is not assigned to module or database error occurs
 */
const createAssessment = async (
  moduleId,
  lecturerId,
  assessmentName,
  totalMark,
  weighting,
  dueDate,
) => {
  // Verify if the lecturer teaches this module
  const [assigned] = await connectDB.execute(
    `SELECT 1 FROM LecturerModule 
             WHERE lecturerId = ? AND moduleId = ?`,
    [lecturerId, moduleId],
  );

  if (assigned.length === 0) {
    throw forbidden("Lecturer not assigned to this module");
  }

  if (weighting < 0 || weighting > 100) {
    throw badRequest("Weighting must be between 0 and 100");
  }

  if (totalMark <= 0) {
    throw badRequest("Total mark must be greater than 0");
  }

  // Create the assessment
  const [result] = await connectDB.execute(
    `INSERT INTO Assessment 
             (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId)
             VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
    [assessmentName, totalMark, weighting, dueDate, lecturerId, moduleId],
  );

  // Return the created assessment details
  return {
    assessmentId: result.insertId,
    assessmentName,
    totalMark,
    weighting,
    dueDate,
    lecturerId,
    moduleId,
  };
};

/**
 * Update an existing assessment
 * Verifies lecturer owns the assessment before updating
 * @param {number} assessmentId - The ID of the assessment to update
 * @param {number} lecturerId - The ID of the lecturer updating the assessment
 * @param {string} assessmentName - Updated name of the assessment
 * @param {number} totalMark - Updated total marks
 * @param {number} weighting - Updated percentage weighting (0-100)
 * @param {string} dueDate - Updated due date (YYYY-MM-DD format)
 * @returns {Object} Object containing success message and updated assessment ID
 * @throws {Error} If assessment doesn't exist, lecturer not authorized, or database error occurs
 */
const updateAssessment = async (
  assessmentId,
  lecturerId,
  assessmentName,
  totalMark,
  weighting,
  dueDate,
) => {
  // Verify the assessment exists and belongs to this lecturer
  const [assessment] = await connectDB.execute(
    `SELECT assessmentId FROM Assessment 
             WHERE assessmentId = ? AND lecturerId = ?`,
    [assessmentId, lecturerId],
  );

  if (assessment.length === 0) {
    throw notFound("Assessment not found or not authorized");
  }

  if (weighting < 0 || weighting > 100) {
    throw badRequest("Weighting must be between 0 and 100");
  }

  if (totalMark <= 0) {
    throw badRequest("Total mark must be greater than 0");
  }

  // Update the assessment
  await connectDB.execute(
    `UPDATE Assessment 
             SET assessmentName = ?, 
                 totalMark = ?, 
                 weighting = ?, 
                 dueDate = ?
             WHERE assessmentId = ? AND lecturerId = ?`,
    [assessmentName, totalMark, weighting, dueDate, assessmentId, lecturerId],
  );

  return assessmentId;
};

/**
 * Delete an assessment
 * Verifies lecturer owns the assessment before deletion
 * Note: This will also delete all associated mark entries due to foreign key constraints
 * @param {number} assessmentId - The ID of the assessment to delete
 * @param {number} lecturerId - The ID of the lecturer deleting the assessment
 * @returns {Object} Object containing success message and deleted assessment ID
 * @throws {Error} If assessment doesn't exist, lecturer not authorized, or database error occurs
 */
const deleteAssessment = async (assessmentId, lecturerId) => {
  // Verify the assessment exists and belongs to this lecturer
  const [assessment] = await connectDB.execute(
    `SELECT assessmentId FROM Assessment 
             WHERE assessmentId = ? AND lecturerId = ?`,
    [assessmentId, lecturerId],
  );

  if (assessment.length === 0) {
    throw notFound("Assessment not found or not authorized");
  }

  // Delete all mark entries for this assessment first
  await connectDB.execute(`DELETE FROM MarkEntry WHERE assessmentId = ?`, [
    assessmentId,
  ]);

  // Delete the assessment
  await connectDB.execute(
    `DELETE FROM Assessment WHERE assessmentId = ? AND lecturerId = ?`,
    [assessmentId, lecturerId],
  );

  return assessmentId;
};

/**
 * Get all assessments for a specific module and student
 * Returns assessment details along with the student's mark for each assessment
 * @param {number} moduleId - The ID of the module
 * @param {number} studentId - The ID of the student
 * @returns {Array} Array of assessment objects with student marks. Student's mark are null if not submitted
 * @throws {Error} If database error occurs
 * TOO NOTE :
 * All assessments are returned even if the student hasn't submitted
 * Includes submission status and date submitted
 * Orders by due date (earliest first)
 */
const getStudentModuleAssessments = async (moduleId, studentId) => {
  try {
    // Query to get all assessments for the module with the student's marks
    const [assessments] = await connectDB.execute(
      `SELECT 
                a.assessmentId,
                a.assessmentName,
                a.totalMark,
                a.weighting,
                a.dueDate,
                me.mark AS studentMark,
                me.submission,
                me.dateSubmitted
             FROM Assessment a
             LEFT JOIN MarkEntry me ON a.assessmentId = me.assessmentId 
                AND me.studentId = ?
             WHERE a.moduleId = ?
             ORDER BY a.dueDate ASC`,
      [studentId, moduleId],
    );

    // Format the response into an array of assessment objects
    return assessments.map((assessment) => ({
      assessmentId: assessment.assessmentId,
      assessmentName: assessment.assessmentName,
      totalMark: assessment.totalMark,
      weighting: assessment.weighting,
      dueDate: assessment.dueDate,
      studentMark: assessment.studentMark || null,
      submission: assessment.submission || false,
      dateSubmitted: assessment.dateSubmitted || null,
    }));
  } catch (error) {
    console.error("Error getting student module assessments:", error);
    throw error;
  }
};

/**
 * Get all assessments for a specific module and lecturer
 * Returns basic assessment details (name, weighting, due date)
 * @param {number} moduleId - The ID of the module
 * @param {number} lecturerId - The ID of the lecturer
 * @returns {Array} Array of assessment objects
 * @throws {Error} If lecturer is not assigned to module or database error occurs
 */
const getLecturerModuleAssessments = async (moduleId, lecturerId) => {
  // Verify if the lecturer teaches this module
  const [assigned] = await connectDB.execute(
    // I just can't seem to get the assigned if I use SELECT 1, insted of SELECT *
    `SELECT * FROM LecturerModule  
             WHERE lecturerId = ? AND moduleId = ?`,
    [lecturerId, moduleId],
  );

  if (assigned.length === 0) {
    throw forbidden("Lecturer not assigned to this module");
  }

  // Query to get all assessments for the module by this lecturer
  const [assessments] = await connectDB.execute(
    `SELECT 
                assessmentId,
                assessmentName,
                weighting,
                dueDate
             FROM Assessment
             WHERE moduleId = ? AND lecturerId = ?
             ORDER BY dueDate ASC`,
    [moduleId, lecturerId],
  );

  return assessments;
};

/**
 * Upload/update marks for multiple students for a specific assessment.
 * Handles bulk insertion and updates of student marks
 * NOTE : Use a transaction to ensure all-or-nothing (if one fails, all fail)
 * @param {number} assessmentId - The ID of the assessment
 * @param {number} lecturerId - The ID of the lecturer uploading marks
 * @param {Array} marksData - Array of objects containing {studentId, mark, submission}
 * @returns {Object} Object containing success message and number of records processed
 * @throws {Error} If assessment not found, lecturer not authorized, validation fails, or database error occurs
 */
const uploadStudentMarks = async (assessmentId, lecturerId, marksData) => {
  // Start a database transaction
  const connection = await connectDB.getConnection();

  try {
    await connection.beginTransaction();

    // Verify the assessment exists and belongs to this lecturer
    const [assessment] = await connection.execute(
      `SELECT a.assessmentId, a.moduleId, a.totalMark 
             FROM Assessment a
             WHERE a.assessmentId = ? AND a.lecturerId = ?`,
      [assessmentId, lecturerId],
    );

    if (assessment.length === 0) {
      throw forbidden("Assessment not found or not authorized");
    }

    // Get the module and the total mark of the assessment
    const moduleId = assessment[0].moduleId;
    const totalMark = assessment[0].totalMark;

    // Verify all students are enrolled in this module
    const studentIds = marksData.map((entry) => entry.studentId);

    // Expand placeholders
    const placeholders = studentIds.map(() => "?").join(",");

    const [enrolledStudents] = await connection.execute(
      `SELECT s.studentId 
             FROM StudentModule sm
             JOIN Student s ON sm.studentId = s.studentId
             WHERE sm.moduleId = ? AND s.studentId IN (${placeholders})`,
      [moduleId, ...studentIds],
    );

    // I had tried this, but ran into, what was called a classic node + mysql trap
    // The bug was placeholder expansion.
    // Never rely on array expansion with IN (?) in prepared statements
    // Always expand placeholders yourself
    /*
        const [enrolledStudents] = await connection.execute(
            `SELECT s.studentId 
             FROM StudentModule sm
             JOIN Student s ON sm.studentId = s.studentId
             WHERE sm.moduleId = ? AND s.studentId IN (?)`, // Only return rows where the studentId is one of the provided student IDs
            [moduleId, studentIds]
        );
        */

    const enrolledStudentIds = enrolledStudents.map((s) => s.studentId);
    const unenrolledStudents = studentIds.filter(
      (id) => !enrolledStudentIds.includes(id),
    );

    if (unenrolledStudents.length > 0) {
      const error = new Error(
        `Students with IDs [${unenrolledStudents.join(", ")}] are not enrolled in this module`,
      );
      error.statusCode = 404;
      throw error;
    }

    // Process each mark entry
    let insertedCount = 0;
    let updatedCount = 0;

    for (const entry of marksData) {
      const { studentId, mark, submission } = entry;

      // Validate mark is within range
      if (mark !== null && (mark < 0 || mark > totalMark)) {
        const error = new Error(
          `Invalid mark ${mark} for student ${studentId}. Must be between 0 and ${totalMark}`,
        );
        error.statusCode = 400;
        throw error;
      }

      // Check if mark entry already exists
      const [existing] = await connection.execute(
        `SELECT markEntryId FROM MarkEntry 
                 WHERE studentId = ? AND assessmentId = ?`,
        [studentId, assessmentId],
      );

      if (existing.length > 0) {
        // Update existing mark entry
        await connection.execute(
          `UPDATE MarkEntry 
                     SET mark = ?, 
                         submission = ?, 
                         dateSubmitted = ?
                     WHERE studentId = ? AND assessmentId = ?`,
          [
            mark,
            submission,
            submission ? new Date() : null,
            studentId,
            assessmentId,
          ],
        );
        updatedCount++;
      } else {
        // Insert new mark entry
        await connection.execute(
          `INSERT INTO MarkEntry 
                     (mark, submission, dateSubmitted, studentId, assessmentId)
                     VALUES (?, ?, ?, ?, ?)`,
          [
            mark,
            submission,
            submission ? new Date() : null,
            studentId,
            assessmentId,
          ],
        );
        insertedCount++;
      }
    }

    // Commit the transaction
    await connection.commit();

    return {
      inserted: insertedCount,
      updated: updatedCount,
      total: insertedCount + updatedCount,
    };
  } catch (error) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("Error uploading student marks:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
};

/**
 * Get the top 3 upcoming assessments for a student across all their modules
 * Returns assessments with the closest due dates that haven't passed yet
 * @param {number} studentId - The ID of the student
 * @returns {Array} Array of up to 3 assessment objects ordered by due date (earliest first)
 * @throws {Error} If database error occurs
 * TO NOTE:
 * - Only returns assessments with future due dates (dueDate >= current date)
 * - Includes module information for context
 * - Shows submission status for each assessment
 * - Limited to 3 most urgent assessments
 */
const getUpcomingAssessments = async (studentId) => {
  try {
    // Query to get the 3 nearest upcoming assessments across all student's modules
    const [assessments] = await connectDB.execute(
      `SELECT 
                a.assessmentId,
                a.assessmentName,
                a.totalMark,
                a.weighting,
                a.dueDate,
                m.moduleId,
                m.moduleName,
                m.moduleCode,
                me.mark AS studentMark,
                me.submission,
                me.dateSubmitted,
                DATEDIFF(a.dueDate, CURDATE()) AS daysUntilDue
             FROM Assessment a
             INNER JOIN Module m ON a.moduleId = m.moduleId
             INNER JOIN StudentModule sm ON m.moduleId = sm.moduleId
             LEFT JOIN MarkEntry me ON a.assessmentId = me.assessmentId 
                AND me.studentId = ?
             WHERE sm.studentId = ?
                AND a.dueDate >= CURDATE()
             ORDER BY a.dueDate ASC
             LIMIT 3`,
      [studentId, studentId],
    );

    // Format the response into an array of assessment objects
    return assessments.map((assessment) => ({
      assessmentId: assessment.assessmentId,
      assessmentName: assessment.assessmentName,
      totalMark: assessment.totalMark,
      weighting: Number(assessment.weighting),
      dueDate: assessment.dueDate,
      daysUntilDue: assessment.daysUntilDue,
      module: {
        moduleId: assessment.moduleId,
        moduleName: assessment.moduleName,
        moduleCode: assessment.moduleCode,
      },
      studentMark: assessment.studentMark === null ? null : Number(assessment.studentMark), // Keep 0 meaningful
      // Note this takes away our ability to know whether there was no record found in the first place
      // Because whether the record was not found or the student did not submit, false is returned 
      submission: Boolean(assessment.submission), 
      // alt -> submission: assessment.submission === null ? false : assessment.submission === 1,
      dateSubmitted: assessment.dateSubmitted ?? null,
    }));
  } catch (error) {
    console.error("Error getting upcoming assessments:", error);
    throw error;
  }
};

module.exports = {
  getStudentModuleAssessments,
  getLecturerModuleAssessments,
  getUpcomingAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  uploadStudentMarks,
};
