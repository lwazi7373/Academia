//Database connection
const connectDB = require("../db/connect"); 

const getStudentWithStudentNumber = async (studentNumber) => {
    try {
        const [[student]] = await connectDB.execute('SELECT * FROM Student WHERE studentNumber = ?',
        [studentNumber]);
        return student;
    } catch (error) {
        console.error("Failed to fetch Student:", error);
        throw error; //Re-throw the error for the controller to handle
    }
}

const getStaffWithStaffNumber = async () => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {getStudentWithStudentNumber, getStaffWithStaffNumber}