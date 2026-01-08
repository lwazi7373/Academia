const connectDB = require("../db/connect"); 

const getDepartmentByName = async (departmentName) => {
    try {
        const [rows] = await connectDB.execute(
            'SELECT departmentId FROM Department WHERE departmentName = ?',
            [departmentName]
        );
        
        // Check if department was found
        if (rows.length === 0) {
            throw new Error(`Department '${departmentName}' not found`);
        }
        
        // Return the departmentId from the first row
        return rows[0].departmentId;
        
    } catch (error) {
        console.error("Failed to fetch department:", error);
        throw error;
    }
}

const getAllDepartments = async () => {
    try {
        const [departments] = await connectDB.execute('SELECT * FROM Department');
        return departments;
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw error;
    }
}

module.exports = {getDepartmentByName, getAllDepartments};