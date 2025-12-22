const authService = require("../services/auth");
const bcrypt = require("bcrypt"); //encrypt passwords
const jwt = require("jsonwebtoken"); //create tokens


/**
 * Hashes the provided user password and registers them with the hashed password
 * @param {*} req
 * @param {*} res
 * @returns "Success" code with corresponding message, if failure then "Unsuccessful" code
 */
const register = async (req, res) => {
  try {
    // We are taking the user role here, but we have a junction table to handle a user with multiple roles
    // TO NOTE : Is active is a toggle, but I think it still comes through the req.body
    const { firstName, lastName, idNumber, emailAddress, userPassword, contactNo, gender, userRole ,isActive} = req.body;
    // Hash the provided password 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userPassword, salt);
    // Create the user with hashed password, and have the new user's id returned from that service 
    const newUserId = await authService.registerUser(
      firstName,lastName,idNumber,emailAddress, hashedPassword, contactNo, gender, userRole ,isActive
    );
    if (newUserId != null) {
      
    } else {
      
    }
  } catch (error) {
    console.error('Register error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
};

/**
 * Verifies user credentials, if successful creates an authToken for the user and logs them in
 * authToken expires after 1 day, that is 24 hours
 * @param {*} req
 * @param {*} res
 * @returns "Successful" code + authToken and user object, if failure then "InvalidUser" or "InvalidPassword" code
 */
const login = async (req, res) => {
  try {  
    // Get everything, even if we do not know, if the user is staff or student
    // Meaning one of these will be null, so we will use that to determine the userRole
    const { studentNumber, staffNumber, userPassword } = req.body;

    let user;
    let userType;

    // If Student is not null then
    if(studentNumber){
        user = await authService.getStudent(studentNumber); // Get the Student, using only the student Number
        userType = 'student';   
    }else if(staffNumber){ // If Staff is not null 
        user = await authService.getStudent(staffNumber); // Get the staff, using only the Staff Number
        userType = 'staff'; 
    }else{
        return res.status(400).json({ code: "Missing-Information", msg: 'Student number or staff number is required' });
    }
    // If which ever user is found, compare the existing against the given password
    if (user != null){
        const isPasswordValid = await bcrypt.compare(
        userPassword,
        user.userPassword
      );
      // if the password is valid
      if (isPasswordValid) {
        const payload = {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName
        };
        const secret = process.env.JWT_SECRET;
        const authToken = jwt.sign(payload, secret, { expiresIn: "1d" });
        res.status(200).json({code: "Successful", message: `Logged in successfully as ${userType}`, user, authToken});
        // if password was not valid
      } else {
        res
          .status(401)
          .json({ code: "Invalid-Password", msg: "Password is Invalid" });
      }
    }else {
        {return res.status(401).json({ code: "Not-Found", msg: 'Invalid credentials' });}
    } 
    
  } catch (error) {
    console.error('Login error:', error); // Testing purposes
    res.status(500).json({ error: error.message });
  }
};