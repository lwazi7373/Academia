const connectDB = require("../db/connect"); 

const getQualificationByName = async (qualificationName) => {
    try {
        const [rows] = await connectDB.execute(
            'SELECT qualificationId FROM Qualification WHERE qualificationName = ?',
            [qualificationName]
        );
        
        // Check if qualification was found
        if (rows.length === 0) {
            throw new Error(`Qualification '${qualificationName}' not found`);
        }
        
        // Return the qualificationId from the first row
        return rows[0].qualificationId;
        
    } catch (error) {
        console.error("Failed to fetch qualification:", error);
        throw error;
    }
}

const getAllQualifications = async () => {
    try {
        const [qualifications] = await connectDB.execute('SELECT * FROM Qualification');
        return qualifications;
    } catch (error) {
        console.error("Failed to fetch qualifications:", error);
        throw error;
    }
}

module.exports = {getQualificationByName, getAllQualifications};