const moduleService = require("../services/moduleService");

const getLecturersModules = async (req, res) => {
    try {
        const lecturerId = req.user.userId; // decoded from the auth Middleware
        const modules = await moduleService.getLecturerModules(lecturerId);
        return res.status(200).json({ msg: "Modules retrieved successfully", modules: modules });
    } catch (error) {
        console.error('Error getting lecturers modules:', error); // Testing purposes
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getLecturersModules }