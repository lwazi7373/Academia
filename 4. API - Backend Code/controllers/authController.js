const authService = require("../services/authService");
const moduleService = require("../services/moduleService");
const qualificationService = require("../services/qualificationService");
const departmentService = require("../services/departmentService");
const studentNumberService = require("../services/studentNumberService");
const staffNumberService = require("../services/staffNumberService");

const bcrypt = require("bcrypt"); //encrypt passwords
const jwt = require("jsonwebtoken"); //create tokens

/**
 * STEP 1 regardless of the type of user at this point : Register user with biographic data
 * Creates the base User record and generates student/staff number
 * @param {*} req
 * @param {*} res
 * @returns userId and generated number (studentNumber or staffNumber)
 */
const registerStep1 = async (req, res) => {
  try {
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
      title
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

    // If the initial registration step failed
    if (!newUserId) {
      return res.status(500).json({ code: "Unsuccessful", msg: "Failed to create user" });
    }
    // Next Step is to generate the Student or Staff number of the user, depending on their userRole
    // Generate the appropriate number based on role
    let generatedNumber;
    let numberType;

    if (userRole === 'STUDENT') {
      generatedNumber = await studentNumberService.generateStudentNumber();
      numberType = 'studentNumber';
    } else if (['LECTURER', 'COORDINATOR', 'HOD'].includes(userRole)) {
      generatedNumber = await staffNumberService.generateStaffNumber();
      numberType = 'staffNumber';
    } else {
      // ADMIN doesn't need a student/staff number
        return res.status(200).json({code: "Successful", msg: "Admin user created successfully",
        data: {
          userId: newUserId,
          role: userRole
        }
      });
    }

    // Return the userId and generated number for step 2 of registration
    return res.status(200).json({
      code: "Successful",
      msg: "Step 1 completed - User created and number generated",
      data: {
        userId: newUserId,
        [numberType]: generatedNumber,
        role: userRole
      }
    });

  } catch (error) {
    console.error('Registration step 1: error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
}


/**
 * STEP 2 (If Student): Complete student registration
 * Assigns qualification and automatically assigns modules based on year/semester
 * @param {*} req
 * @param {*} res
 */
const registerStep2Student = async (req, res) => {
  try {
    const {
      userId,
      studentNumber,
      qualificationName, // What is arriving here is the qualification name not id 
      yearOfStudy,
      semesterNo, 
      levelOfEducation // Forgot to add it on the frontend, do something to solve this
    } = req.body;

    // We need the qualificationId, to create the student record
    const qualificationId = await qualificationService.getQualificationByName(qualificationName);

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

    return res.status(201).json({code: "Successful", msg: "Student registration completed successfully",
      data: {
        student: studentRecord,
        modulesAssigned: assignedModules.length,
        modules: assignedModules
      }
    });

  } catch (error) {
    console.error('Student Registration step 2 : error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
}


/**
 * STEP 2 (If staff): Assign department to staff member
 * Creates the appropriate staff record (Lecturer/Coordinator/HOD)
 * @param {*} req
 * @param {*} res
 */
const registerStep2Staff = async (req, res) => {
  try {
    const {
      userId,
      staffNumber,
      departmentName,
      userRole // 'LECTURER', 'COORDINATOR', or 'HOD'
    } = req.body;

    const departmentId = await departmentService.getDepartmentByName(departmentName);
    // Reserve the staff number by creating the appropriate staff record
    const staffRecord = await staffNumberService.reserveStaffNumber(
      userId,
      staffNumber,
      departmentId,
      userRole
    );

    return res.status(201).json({
      code: "Successful", msg: `Step 2 completed - ${userRole} assigned to department`,
      data: {
        staff: staffRecord
      }
    });

  } catch (error) {
    console.error('Staff Registration step 2 : error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
}

/**
 * After the registration step 2, for a staff member (i.e., a department is assigned to them)
 * We get all the modules under that department, and make them available for step 3, because they need to be listed for the admin
 * to select, for assigning to the lecturer in question
 * @param {*} req 
 * @param {*} res 
 * @returns all module objects under the department
 */

const getDepartmentModules = async (req, res) => {
    try {
        const { departmentId } = req.params; // or req.query, or req.body, we'll see in the frontend
        
        const modules = await moduleService.getModulesByDepartment(departmentId);
        
        return res.status(200).json({
            code: "Successful",
            msg: "Modules retrieved successfully",
            data: {
                modules: modules
            }
        });
        
    } catch (error) {
        console.error('Get department modules error:', error);
        res.status(500).json({ error: error.message });
    }
}


/**
 * STEP 3 (Natural progression from step 2, if staff): Assign modules to staff member (Lecturer/Coordinator only)
 * Note: HOD doesn't need module assignment
 * Note: Only the moduleId's are going to be sent, not the entire module objects
 * @param {*} req
 * @param {*} res
 */
const registerStep3Staff = async (req, res) => {
  try {
    const {
      userId,
      userRole,
      moduleIds // Array of module IDs to assign
    } = req.body;

     // HOD doesn't need module assignment
    if (userRole === 'HOD') {
      return res.status(200).json({ code: "Successful", msg: "HOD registration completed - No modules to assign"});
    }

     // Assign modules to Lecturer or Coordinator
    let assignedModules;
    
    if (userRole === 'LECTURER') {
      assignedModules = await authService.assignModulesToLecturer(userId, moduleIds);
    } else if (userRole === 'COORDINATOR') {
      assignedModules = await authService.assignModulesToCoordinator(userId, moduleIds);
    } else {
      return res.status(400).json({code: "Unsuccessful" , msg: "Invalid user Role"});
    }

    return res.status(201).json({
      code: "Successful", message: `${userRole} registration completed successfully`,
      data: {
        modulesAssigned: assignedModules.length,
        modules: assignedModules
      }
    });

  } catch (error) {
    console.error('Staff Register Step 3 Staff error:', error); //Testing purposes
    res.status(500).json({ error: error.message });
  }
}

/**
 * Verifies user credentials, if successful creates an authToken for the user and logs them in
 * authToken expires after 1 day, that is 24 hours
 * @param {*} req
 * @param {*} res
 * @returns "Successful" code + authToken and user object, if failure then "InvalidUser" or "InvalidPassword" code
 */
const login = async (req, res) => {
  try {  
    const {identifierNumber, userPassword} = req.body;
    const { user } = await authService.loginUser(identifierNumber); // Immediately destructure the user 

    if (!user) {return res.status(401).json({code: "Unsuccessful", msg: "User Not found" });}
    // After getting the user object, validate if the password is correct
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordValid) {return res.status(401).json({code: "Unsuccessful", msg: "User password is incorrect" });}

    // If correct create token
    const payload = {userId: user.userId, userRoles: user.roles};
    const secret = process.env.JWT_SECRET;
    const authToken = jwt.sign(payload, secret, { expiresIn: "1d" });
    // Send response 
    res.status(200).json({code: "Successful", authToken, user:{userId: user.userId, userRoles: user.roles}});
  } catch (error) {
    console.error('Login error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
};


/**
 * DEV ONLY - like honestly, I tried everything
 * Updates a user's password (admin/dev use only)
 * Users cannot update their own information in production
 * @param {*} req
 * @param {*} res
 */
const updateUserPassword = async (req, res) => {
  try {
    const { identifierNumber, newPassword } = req.body;

    if (!identifierNumber || !newPassword) {
      return res.status(400).json({
        code: "Unsuccessful",
        msg: "identifierNumber and newPassword are required"
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
      return res.status(404).json({
        code: "Unsuccessful",
        msg: "User not found or inactive"
      });
    }

    return res.status(200).json({
      code: "Successful",
      msg: "Password updated successfully (DEV ONLY)"
    });

  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {login, registerStep1, registerStep2Student, registerStep2Staff, getDepartmentModules ,registerStep3Staff, updateUserPassword}