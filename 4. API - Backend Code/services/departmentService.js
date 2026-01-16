const connectDB = require("../db/connect"); 
// For Error handling
const {notFound} = require("../errors/httpErrors");

const getDepartmentByName = async (departmentName) => {

        const [rows] = await connectDB.execute(
            'SELECT departmentId FROM Department WHERE departmentName = ?',
            [departmentName]
        );
        
        // Check if department was found
        if (rows.length === 0) {
            throw notFound(`Department '${departmentName}' not found`);
        }
        
        // Return the departmentId from the first row
        return rows[0].departmentId;

}

const getAllDepartments = async () => {
        const [departments] = await connectDB.execute('SELECT * FROM Department');
        return departments;
}

module.exports = {getDepartmentByName, getAllDepartments};