const connectDB = require("../db/connect"); 
// For error handliing
const {notFound} = require("../errors/httpErrors");

const getQualificationByName = async (qualificationName) => {
        const [rows] = await connectDB.execute(
            'SELECT qualificationId FROM Qualification WHERE qualificationName = ?',
            [qualificationName]
        );
        
        // Check if qualification was found
        if (rows.length === 0) {
           throw notFound(`Qualification '${qualificationName}' not found`)
        }
        
        // Return the qualificationId from the first row
        return rows[0].qualificationId;
   
}

const getAllQualifications = async () => {
        const [qualifications] = await connectDB.execute('SELECT * FROM Qualification');
        return qualifications;
}

module.exports = {getQualificationByName, getAllQualifications};