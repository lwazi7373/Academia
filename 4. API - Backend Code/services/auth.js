//Database connection
const connectDB = require("../db/connect"); 

/**
 * Service to register a user to the database
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
  isActive
) => {
  try {
    const [result] = await connectDB.execute(
      `
      INSERT INTO Users
      (firstName, lastName, idNumber, emailAddress, userPassword, contactNo, gender, userRole, isActive)
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
        userRole,
        isActive
      ]
    );

    return result.insertId;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
};

module.exports = {
  registerUser
};