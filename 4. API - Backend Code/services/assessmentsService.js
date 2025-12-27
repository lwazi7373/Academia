//Database connection
const connectDB = require("../db/connect");

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
const createAssessment = async (moduleId, lecturerId, assessmentName, totalMark, weighting, dueDate) => {
    try {
        // Verify if the lecturer teaches this module
        const [assigned] = await connectDB.execute(
            `SELECT 1 FROM LecturerModule 
             WHERE lecturerId = ? AND moduleId = ?`,
            [lecturerId, moduleId]
        );

        if (assigned.length === 0) {
            throw new Error('Lecturer not assigned to this module');
        }

        // Validate weighting is within range
        if (weighting < 0 || weighting > 100) {
            throw new Error('Weighting must be between 0 and 100');
        }

        // Validate totalMark is positive
        if (totalMark <= 0) {
            throw new Error('Total mark must be greater than 0');
        }

        // Create the assessment
        const [result] = await connectDB.execute(
            `INSERT INTO Assessment 
             (assessmentName, totalMark, weighting, dueDate, createdAt, lecturerId, moduleId)
             VALUES (?, ?, ?, ?, NOW(), ?, ?)`,
            [assessmentName, totalMark, weighting, dueDate, lecturerId, moduleId]
        );

        // Return the created assessment details
        return {
            assessmentId: result.insertId,
            assessmentName,
            totalMark,
            weighting,
            dueDate,
            lecturerId,
            moduleId
        };

    } catch (error) {
        console.error('Error creating assessment:', error);
        throw error;
    }
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
const updateAssessment = async (assessmentId, lecturerId, assessmentName, totalMark, weighting, dueDate) => {
    try {
        // Verify the assessment exists and belongs to this lecturer
        const [assessment] = await connectDB.execute(
            `SELECT assessmentId FROM Assessment 
             WHERE assessmentId = ? AND lecturerId = ?`,
            [assessmentId, lecturerId]
        );

        if (assessment.length === 0) {
            throw new Error('Assessment not found or you are not authorized to edit it');
        }

        // Validate weighting is within range
        if (weighting < 0 || weighting > 100) {
            throw new Error('Weighting must be between 0 and 100');
        }

        // Validate totalMark is positive
        if (totalMark <= 0) {
            throw new Error('Total mark must be greater than 0');
        }

        // Update the assessment
        await connectDB.execute(
            `UPDATE Assessment 
             SET assessmentName = ?, 
                 totalMark = ?, 
                 weighting = ?, 
                 dueDate = ?
             WHERE assessmentId = ? AND lecturerId = ?`,
            [assessmentName, totalMark, weighting, dueDate, assessmentId, lecturerId]
        );

        return {
            message: 'Assessment updated successfully',
            assessmentId
        };

    } catch (error) {
        console.error('Error updating assessment:', error);
        throw error;
    }
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
    try {
        // Verify the assessment exists and belongs to this lecturer
        const [assessment] = await connectDB.execute(
            `SELECT assessmentId FROM Assessment 
             WHERE assessmentId = ? AND lecturerId = ?`,
            [assessmentId, lecturerId]
        );

        if (assessment.length === 0) {
            throw new Error('Assessment not found or you are not authorized to delete it');
        }

        // Delete all mark entries for this assessment first
        await connectDB.execute(
            `DELETE FROM MarkEntry WHERE assessmentId = ?`,
            [assessmentId]
        );

        // Delete the assessment
        await connectDB.execute(
            `DELETE FROM Assessment WHERE assessmentId = ? AND lecturerId = ?`,
            [assessmentId, lecturerId]
        );

        return {
            message: 'Assessment deleted successfully',
            assessmentId
        };

    } catch (error) {
        console.error('Error deleting assessment:', error);
        throw error;
    }
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
            [studentId, moduleId]
        );

        // Format the response
        return assessments.map(assessment => ({
            assessmentId: assessment.assessmentId,
            assessmentName: assessment.assessmentName,
            totalMark: assessment.totalMark,
            weighting: assessment.weighting,
            dueDate: assessment.dueDate,
            studentMark: assessment.studentMark || null,
            submission: assessment.submission || false,
            dateSubmitted: assessment.dateSubmitted || null
        }));

    } catch (error) {
        console.error('Error getting student module assessments:', error);
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
    try {
        // Verify if the lecturer teaches this module
        const [assigned] = await connectDB.execute(
            `SELECT 1 FROM LecturerModule 
             WHERE lecturerId = ? AND moduleId = ?`,
            [lecturerId, moduleId]
        );

        if (assigned.length === 0) {
            throw new Error('Lecturer not assigned to this module');
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
            [moduleId, lecturerId]
        );

        return assessments;

    } catch (error) {
        console.error('Error getting lecturer module assessments:', error);
        throw error;
    }
};

module.exports = {
    getStudentModuleAssessments,
    getLecturerModuleAssessments,
    createAssessment,
    updateAssessment,
    deleteAssessment
};