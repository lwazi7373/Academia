const authService = require("../services/authService");
const moduleService = require("../services/moduleService");
const qualificationService = require("../services/qualificationService");
const departmentService = require("../services/departmentService");
const studentNumberService = require("../services/studentNumberService");
const staffNumberService = require("../services/staffNumberService");
const {notFound} = require("../errors/httpErrors");
const bcrypt = require("bcrypt"); //encrypt passwords
const jwt = require("jsonwebtoken"); //create tokens

/**
 * STEP 1 regardless of the type of user at this point : Register user with biographic data
 * Creates the base User record and generates student/staff number
 * @param {*} req
 * @param {*} res
 * @returns userId, generated number (studentNumber or staffNumber) and userRole 
 */
const registerStep1 = async (req, res) => {

    const {
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
    } = req.body;

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userPassword, salt);

    // Create the base user record
    const newUserId = await authService.registerUser(
      firstName,
      lastName,
      idNumber,
      emailAddress,
      hashedPassword,
      contactNo,
      gender,
      userRole,
      isActive,
      title
    );
  
    // Next Step is to generate the Student or Staff number of the user, depending on their userRole
    // Generate the appropriate number based on role
    let generatedNumber;
    let numberType;

    if (userRole === "STUDENT") {
      generatedNumber = await studentNumberService.generateStudentNumber();
      numberType = "studentNumber";
    } else if (["LECTURER", "COORDINATOR", "HOD"].includes(userRole)) {
      generatedNumber = await staffNumberService.generateStaffNumber();
      numberType = "staffNumber";
    } else {
      // ADMIN doesn't need a student/staff number
      // (I will never really register an Admin, no need to stress on responseTypes in the frontend)
      return res.status(200).json({
        msg: "Admin user created successfully",
        userId: newUserId,
        role: userRole,
      });
    }

    // Return the userId and generated number for step 2 of registration
    return res.status(200).json({
      msg: "Step 1 completed - User created and number generated",
      userId: newUserId,
      [numberType]: generatedNumber, // Dynamic key: either "studentNumber" or "staffNumber"
      role: userRole,
    });
  
};

/**
 * STEP 2 (If Student): Complete student registration
 * Assigns qualification and automatically assigns modules based on year/semester
 * @param {*} req
 * @param {*} res
 * @returns the student recors, number of modules assigned and the actual modules assigned to student
 */
const registerStep2Student = async (req, res) => {

    const {
      userId, // userId will match as studentId (received from the registerStep1), not sure how I will store it though
      studentNumber,
      qualificationName, // What is arriving here is the qualification name not id
      yearOfStudy,
      semesterNo,
      levelOfEducation, // Forgot to add it on the frontend, do something to solve this
    } = req.body;

    // We need the qualificationId, to create the student record
    const qualificationId = await qualificationService.getQualificationByName(
      qualificationName
    );

    // Reserve the student number by creating Student record
    const studentRecord = await studentNumberService.reserveStudentNumber(
      userId,
      studentNumber,
      qualificationId,
      yearOfStudy,
      levelOfEducation
    );

    // Automatically assign modules based on qualification, year, and semester
    const assignedModules = await authService.assignModulesToStudent(
      userId,
      qualificationId,
      yearOfStudy,
      semesterNo
    );
    // return the student record, assigned modules and the number of assigned modules
    return res.status(201).json({
      msg: "Student registration completed successfully",
      student: studentRecord,
      modulesAssigned: assignedModules.length,
      modules: assignedModules,
    });
};

/**
 * Used to get the all the qualifications as options to select from when registering a student
 * @param {*} req
 * @param {*} res
 * @returns qualifications (all) in the database
 */
const getAllQualifications = async (req, res) => {
    const qualifications = await qualificationService.getAllQualifications();
    return res.status(201).json({
      msg: "Retrieved qualifications",
      qualifications: qualifications,
    });
  
};

/**
 * Used to get the all the departments as options to select from when registering a staff member
 * @param {*} req
 * @param {*} res
 * @returns departments (all) in the database
 */
const getAllDepartments = async (req, res) => {
    const departments = await departmentService.getAllDepartments();
    return res.status(201).json({
      msg: "Retrieved departments",
      departments: departments,
    });

};

/**
 * STEP 2 (If staff): Assign department to staff member
 * Creates the appropriate staff record (Lecturer/Coordinator/HOD)
 * @param {*} req
 * @param {*} res
 * @returns the staff record
 */
const registerStep2Staff = async (req, res) => {

    const {
      userId, // userId will match as staffId (received from the registerStep1), not sure how I will store it though
      staffNumber,
      departmentId,
      userRole, // 'LECTURER', 'COORDINATOR', or 'HOD'
    } = req.body;
   
    // Reserve the staff number by creating the appropriate staff record
    const staffRecord = await staffNumberService.reserveStaffNumber(
      userId,
      staffNumber,
      departmentId,
      userRole
    );

    return res.status(201).json({
      msg: `Step 2 completed - ${userRole} assigned to department`,
      staff: staffRecord,
    });
 
};

/**
 * After the registration step 2, for a staff member (i.e., a department is assigned to them)
 * We get all the modules under that department, and make them available for step 3, because they need to be listed for the admin
 * to select from, to assigning to the lecturer being registered
 * @param {*} req
 * @param {*} res
 * @returns all modules under the department
 */

const getDepartmentModules = async (req, res) => {
    const { departmentId } = req.params; // or req.query, or req.body, we'll see in the frontend
    const modules = await moduleService.getModulesByDepartment(departmentId);
    return res.status(200).json({
      msg: "Modules retrieved successfully",
      modules: modules, // important for module id's to be present, because there will be used for step 3 registration for staff
    });
  
};

/**
 * STEP 3 (Natural progression from step 2, if staff): Assign modules to staff member (Lecturer/Coordinator only)
 * Note: HOD doesn't need module assignment
 * Note: Only the moduleId's are going to be sent, not the entire module objects
 * @param {*} req
 * @param {*} res
 * @returns the modules assigned to the staff and the number of modules assigned
 */
const registerStep3Staff = async (req, res) => {
  
    const {
      userId, // userId will match as staffId (received from the registerStep1 or registerStep2Staff), if it was stored properly
      userRole,
      moduleIds, // Array of module IDs to assign
    } = req.body;

    // HOD doesn't need module assignment
    if (userRole === "HOD") {
      return res.status(200).json({
        msg: "HOD registration completed - No modules to assign",
      });
    }

    // Assign modules to Lecturer or Coordinator
    let assignedModules;

    if (userRole === "LECTURER") {
      assignedModules = await authService.assignModulesToLecturer(
        userId,
        moduleIds
      );
    } else if (userRole === "COORDINATOR") {
      assignedModules = await authService.assignModulesToCoordinator(
        userId,
        moduleIds
      );
    } else {
      return res.status(400).json({ msg: "Invalid user Role" });
    }

    return res.status(201).json({
      msg: `${userRole} registration completed successfully`,
      modulesAssigned: assignedModules.length,
      modules: assignedModules,
    });
};

/**
 * Gets the ccurrent user (frontend architecture purposes)
 * @param {*} req
 * @param {*} res
 * @returns user's data
 */
const getMe = async (req, res) => {
    const userId = req.user.userId;
    const userData = await authService.getCurrentUser(userId);
    if (!userData) throw notFound("User not found");
    res.status(200).json({ msg: "User found", user: userData });
};

/**
 * Verifies user credentials, if successful creates an authToken for the user and logs them in
 * authToken expires after 1 day, that is 24 hours
 * @param {*} req
 * @param {*} res
 * @returns the authToken and a user object 
 */
const login = async (req, res) => {

    const { identifierNumber, userPassword } = req.body;
    const { user } = await authService.loginUser(identifierNumber); // Note password is returned here (don't send it)

    // After getting the user object, validate if the password is correct
    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    //No seperation for security purposes, to avoid giving out too much information.
    if (!user || !isPasswordValid) {
      return res.status(400).json({
        //400 status code, will match the frontend (axios error handling)
        code: "INVALID_CREDENTIALS",
        msg: "Invalid identifier or password",
      });
    }

    // If correct create token
    const payload = { userId: user.userId, userRoles: user.roles };
    const secret = process.env.JWT_SECRET;
    const authToken = jwt.sign(payload, secret, { expiresIn: "1d" });
    // Send response
    res.status(200).json({
      msg : "Sucessfully logged In User",
      authToken, // I want to name it this way, its not like i will have any other types of tokens
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        emailAddress: user.emailAddress,
        contactNo: user.contactNo,
        gender: user.gender,
        roles: user.roles,
        // userPassword is NOT included
      },
    });
};

/**
 * DEV ONLY - like honestly, I tried everything
 * Updates a user's password (admin/dev use only)
 * Users cannot update their own information in production
 * @param {*} req
 * @param {*} res
 */
const updateUserPassword = async (req, res) => {

    const { identifierNumber, newPassword } = req.body;

    if (!identifierNumber || !newPassword) {
      return res.status(400).json({
        code: "Unsuccessful",
        msg: "identifierNumber and newPassword are required",
      });
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Update password via service
    const updated = await authService.updatePasswordByIdentifier(
      identifierNumber,
      hashedPassword
    );

    if (!updated) {
      return res.status(404).json({ msg: "User not found or inactive" });
    }

    return res
      .status(200)
      .json({ msg: "Password updated successfully (DEV ONLY)" });

};

module.exports = {
  getMe,
  login,
  registerStep1,
  registerStep2Student,
  registerStep2Staff,
  getAllDepartments,
  getAllQualifications,
  getDepartmentModules,
  registerStep3Staff,
  updateUserPassword,
};
