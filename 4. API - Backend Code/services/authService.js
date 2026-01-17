//Database connection
const connectDB = require("../db/connect");
// For error handling
const { notFound, unauthorized } = require("../errors/httpErrors");

/**
 * Get current user with all their profile data based on roles
 * @param {number} userId - The user's ID from JWT token
 * @returns {Promise<Object>} Complete user profile with role-specific data
 */
const getCurrentUser = async (userId) => {
  // Get base user info
  const [userRows] = await connectDB.query(
    `SELECT 
        userId, 
        firstName, 
        lastName, 
        title, 
        emailAddress, 
        contactNo, 
        gender, 
        isActive,
        dateRegistered
      FROM Users 
      WHERE userId = ? AND isActive = TRUE`,
    [userId],
  );

  if (userRows.length === 0) {
    throw notFound("User not found");
  }

  const user = userRows[0];

  // Get user roles (using existing function)
  const roles = await getUserRoles(userId);

  // Get role-specific data
  const roleDetails = await getRoleSpecificData(userId, roles);

  return {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    title: user.title,
    emailAddress: user.emailAddress,
    contactNo: user.contactNo,
    gender: user.gender,
    isActive: user.isActive,
    dateRegistered: user.dateRegistered,
    roles: roles,
    ...roleDetails, // Spreads role-specific data
  };
};

/**
 * Get role-specific data for each role the user has
 * @param {number} userId
 * @param {Array<string>} roles - Array of role strings
 * @returns {Promise<Object>} Object with role-specific profile data
 */
const getRoleSpecificData = async (userId, roles) => {
  const roleData = {};

  for (const role of roles) {
    switch (role) {
      case "STUDENT":
        roleData.studentProfile = await getStudentProfile(userId);
        break;
      case "LECTURER":
        roleData.lecturerProfile = await getLecturerProfile(userId);
        break;
      case "COORDINATOR":
        roleData.coordinatorProfile = await getCoordinatorProfile(userId);
        break;
      case "HOD":
        roleData.hodProfile = await getHODProfile(userId);
        break;
      case "ADMIN":
        roleData.adminProfile = { role: "ADMIN" };
        break;
    }
  }

  return roleData;
};

/**
 * Get student-specific profile data
 * @param {number} studentId
 * @returns Student profile
 */
const getStudentProfile = async (studentId) => {
  try {
    const [rows] = await connectDB.query(
      `SELECT 
        s.studentId,
        s.studentNumber,
        s.levelOfEducation,
        s.yearOfStudy,
        s.qualificationId,
        q.qualificationName,
        q.qualificationCode,
        q.duration,
        q.totalCredits,
        d.departmentId,
        d.departmentName,
        f.facultyId,
        f.facultyName
      FROM Student s
      JOIN Qualification q ON s.qualificationId = q.qualificationId
      JOIN Department d ON q.departmentId = d.departmentId
      JOIN Faculty f ON d.facultyId = f.facultyId
      WHERE s.studentId = ?`,
      [studentId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error getting student profile:", error);
    throw error;
  }
};

/**
 * Get lecturer-specific profile data
 * @param {number} lecturerId
 * @returns Lecturer profile
 */
const getLecturerProfile = async (lecturerId) => {
  try {
    const [rows] = await connectDB.query(
      `SELECT 
        l.lecturerId,
        l.staffNumber,
        l.departmentId,
        d.departmentName,
        f.facultyId,
        f.facultyName
      FROM Lecturer l
      JOIN Department d ON l.departmentId = d.departmentId
      JOIN Faculty f ON d.facultyId = f.facultyId
      WHERE l.lecturerId = ?`,
      [lecturerId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error getting lecturer profile:", error);
    throw error;
  }
};

/**
 * Get coordinator-specific profile data
 * @param {number} coordinator
 * @returns coordinator profile
 */
const getCoordinatorProfile = async (coordinatorId) => {
  try {
    const [rows] = await connectDB.query(
      `SELECT 
        c.coordinatorId,
        c.staffNumber,
        c.departmentId,
        d.departmentName,
        f.facultyId,
        f.facultyName
      FROM Coordinator c
      JOIN Department d ON c.departmentId = d.departmentId
      JOIN Faculty f ON d.facultyId = f.facultyId
      WHERE c.coordinatorId = ?`,
      [coordinatorId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error getting coordinator profile:", error);
    throw error;
  }
};

/**
 * Get HOD-specific profile data
 * @param hodId
 * @returns HOD profile
 */
const getHODProfile = async (hodId) => {
  try {
    const [rows] = await connectDB.query(
      `SELECT 
        h.hodId,
        h.staffNumber,
        h.departmentId,
        d.departmentName,
        f.facultyId,
        f.facultyName
      FROM HOD h
      JOIN Department d ON h.departmentId = d.departmentId
      JOIN Faculty f ON d.facultyId = f.facultyId
      WHERE h.hodId = ?`,
      [hodId],
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error getting HOD profile:", error);
    throw error;
  }
};

/**
 * Service to register a user to the database
 * Creates user record and assigns role in UserRoles junction table
 * Note record will have dateCreated, that is auto generated by the datahbase when created
 * @param {*} firstName
 * @param {*} lastName
 * @param {*} idNumber
 * @param {*} emailAddress
 * @param {*} userPassword
 * @param {*} contactNo
 * @param {*} gender
 * @param {*} isActive
 * @returns The id of the user that has just been created/Registered
 */
const registerUser = async (
  firstName,
  lastName,
  idNumber,
  emailAddress,
  userPassword,
  contactNo,
  gender,
  userRole,
  isActive,
  title,
) => {
  let connection;
  try {
    // Get a connection to use transaction
    connection = await connectDB.getConnection();
    await connection.beginTransaction();

    // Insert into Users table (without userRole)
    const [userResult] = await connection.execute(
      `
      INSERT INTO Users
      (firstName, lastName, idNumber, emailAddress, userPassword, contactNo, gender, isActive, title)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        firstName,
        lastName,
        idNumber,
        emailAddress,
        userPassword,
        contactNo,
        gender,
        isActive,
        title,
      ],
    );

    const userId = userResult.insertId;

    // Insert into UserRoles junction table
    await connection.execute(
      `
      INSERT INTO UserRoles
      (userId, userRole)
      VALUES (?, ?)
      `,
      [userId, userRole],
    );

    // Commit the transaction
    await connection.commit();

    return userId;
  } catch (error) {
    // Rollback on error
    if (connection) {
      await connection.rollback();
    }
    console.error("Failed to create user:", error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Identifies the type of user, as a helper for the login process
 * @param {nummber} identifierNumber
 * @returns the user
 */
const findUserByIdentifier = async (identifierNumber) => {
  try {
    // Try to find as student first
    const [students] = await connectDB.query(
      `SELECT u.* 
         FROM Users u 
         INNER JOIN Student s ON u.userId = s.studentId 
         WHERE s.studentNumber = ? AND u.isActive = TRUE`,
      [identifierNumber], // Where the identifierNumber represents the studentNumber
    );

    if (students.length > 0) {
      return students[0];
    }

    // If not student, try as staff (Lecturer, Coordinator, or HOD)
    const [staff] = await connectDB.query(
      `SELECT u.* 
         FROM Users u 
         WHERE u.userId IN (
           SELECT lecturerId FROM Lecturer WHERE staffNumber = ?
           UNION
           SELECT coordinatorId FROM Coordinator WHERE staffNumber = ?
           UNION
           SELECT hodId FROM HOD WHERE staffNumber = ?
         ) AND u.isActive = TRUE
         LIMIT 1`,
      [identifierNumber, identifierNumber, identifierNumber],
    );

    return staff.length > 0 ? staff[0] : null; //If there is something to return, return the first, if not return null
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
};

/**
 * Gets the roles of the users as a helper for the registration process
 * @param {number} userId
 * @returns the role of the user
 */
const getUserRoles = async (userId) => {
  try {
    const [roles] = await connectDB.query(
      "SELECT userRole FROM UserRoles WHERE userId = ?",
      [userId],
    );

    return roles.map((r) => r.userRole);
  } catch (error) {
    console.error("Error getting user roles:", error);
    throw error;
  }
};

/**
 * Automatically assigns modules to a student based on their qualification, year, and semester
 * Queries QualificationModule to find which modules should be assigned
 * @param {number} studentId - The student's user ID
 * @param {number} qualificationId - The qualification ID
 * @param {number} yearOfStudy - The academic year (1, 2, 3, etc.)
 * @param {number} semesterNo - The semester number (1 or 2)
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToStudent = async (
  studentId,
  qualificationId,
  yearOfStudy,
  semesterNo,
) => {
  const connection = await connectDB.getConnection();

  try {
    await connection.beginTransaction();

    // Get all modules for this qualification, year, and semester
    const [modules] = await connection.query(
      `SELECT qm.moduleId, m.moduleName, m.moduleCode, m.credits, qm.isCompulsory
       FROM QualificationModule qm
       INNER JOIN Module m ON qm.moduleId = m.moduleId
       WHERE qm.qualificationId = ? 
       AND qm.academicYear = ? 
       AND qm.semesterNo = ?`,
      [qualificationId, yearOfStudy, semesterNo],
    );

    if (modules.length === 0) {
      await connection.commit();
      return [];
    }

    const assignedModules = [];

    // Insert each module into StudentModule
    for (const module of modules) {
      // Check if already assigned (prevent duplicates)
      const [existing] = await connection.query(
        "SELECT studentModuleId FROM StudentModule WHERE studentId = ? AND moduleId = ?",
        [studentId, module.moduleId],
      );

      if (existing.length === 0) {
        await connection.query(
          "INSERT INTO StudentModule (studentId, moduleId) VALUES (?, ?)",
          [studentId, module.moduleId],
        );

        assignedModules.push({
          moduleId: module.moduleId,
          moduleName: module.moduleName,
          moduleCode: module.moduleCode,
          credits: module.credits,
          isCompulsory: module.isCompulsory,
        });
      }
    }

    await connection.commit();
    return assignedModules;
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to assign modules to student: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Assigns specific modules to a lecturer
 * @param {number} lecturerId - The lecturer's user ID
 * @param {Array<number>} moduleIds - Array of module IDs to assign
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToLecturer = async (lecturerId, moduleIds) => {
  const connection = await connectDB.getConnection();

  try {
    await connection.beginTransaction();

    const assignedModules = [];

    for (const moduleId of moduleIds) {
      // Check if already assigned
      const [existing] = await connection.query(
        "SELECT lecturerModuleId FROM LecturerModule WHERE lecturerId = ? AND moduleId = ?",
        [lecturerId, moduleId],
      );

      if (existing.length === 0) {
        await connection.query(
          "INSERT INTO LecturerModule (lecturerId, moduleId) VALUES (?, ?)",
          [lecturerId, moduleId],
        );

        // Get module details
        const [moduleDetails] = await connection.query(
          "SELECT moduleId, moduleName, moduleCode, credits FROM Module WHERE moduleId = ?",
          [moduleId],
        );

        if (moduleDetails.length > 0) {
          assignedModules.push(moduleDetails[0]);
        }
      }
    }

    await connection.commit();
    return assignedModules;
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to assign modules to lecturer: ${error.message}`);
  } finally {
    connection.release();
  }
};

/**
 * Assigns specific modules to a coordinator
 * @param {number} coordinatorId - The coordinator's user ID
 * @param {Array<number>} moduleIds - Array of module IDs to assign
 * @returns {Promise<Array>} Array of assigned modules
 */
const assignModulesToCoordinator = async (coordinatorId, moduleIds) => {
  const connection = await connectDB.getConnection();

  try {
    await connection.beginTransaction();

    const assignedModules = [];

    for (const moduleId of moduleIds) {
      // Check if already assigned
      const [existing] = await connection.query(
        "SELECT coordinatorModuleId FROM CoordinatorModule WHERE coordinatorId = ? AND moduleId = ?",
        [coordinatorId, moduleId],
      );

      if (existing.length === 0) {
        await connection.query(
          "INSERT INTO CoordinatorModule (coordinatorId, moduleId) VALUES (?, ?)",
          [coordinatorId, moduleId],
        );

        // Get module details
        const [moduleDetails] = await connection.query(
          "SELECT moduleId, moduleName, moduleCode, credits FROM Module WHERE moduleId = ?",
          [moduleId],
        );

        if (moduleDetails.length > 0) {
          assignedModules.push(moduleDetails[0]);
        }
      }
    }

    await connection.commit();
    return assignedModules;
  } catch (error) {
    await connection.rollback();
    throw new Error(
      `Failed to assign modules to coordinator: ${error.message}`,
    );
  } finally {
    connection.release();
  }
};

/**
 * Identify the type os user, get their role and then logged them in
 * @param {number} identifierNumber
 * @returns {Promise<Object>} user object
 */
const loginUser = async (identifierNumber) => {
  // Find user by studentNumber or staffNumber
  // At this point, even if we get the user, we still do not know their role, it is located in the UserRoles junction table,
  // because, a user can have multiple roles
  const user = await findUserByIdentifier(identifierNumber);

  if (!user) {
    throw unauthorized("Invalid student/staff number or password");
  }

  // Get the user's role(s), using the id retrieved from the user we identfied
  const roles = await getUserRoles(user.userId);

  // return only the information, I see as necessary for now
  return {
    user: {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPassword: user.userPassword, // I always prefer to do the bcrypt validation on the controller
      title: user.title,
      emailAddress: user.emailAddress,
      contactNo: user.contactNo,
      gender: user.gender,
      roles: roles, // Will need this immediately after the login
    },
  };
};

/**
 * DEV ONLY - the pain of writing this ;;;;;
 * Updates a user's password using studentNumber or staffNumber
 * @param {*} identifierNumber
 * @param {*} hashedPassword
 * @returns true if updated, false otherwise
 */
const updatePasswordByIdentifier = async (identifierNumber, hashedPassword) => {
  let connection;

  try {
    connection = await connectDB.getConnection();
    await connection.beginTransaction();

    // Find userId first (same logic as login)
    const user = await findUserByIdentifier(identifierNumber);

    if (!user) {
      await connection.rollback();
      return false;
    }

    // Update password
    const [result] = await connection.execute(
      `
      UPDATE Users
      SET userPassword = ?
      WHERE userId = ?
      `,
      [hashedPassword, user.userId],
    );

    await connection.commit();

    return result.affectedRows > 0;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Failed to update password:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePasswordByIdentifier,
  assignModulesToStudent,
  assignModulesToLecturer,
  assignModulesToCoordinator,
  getCurrentUser,
};
