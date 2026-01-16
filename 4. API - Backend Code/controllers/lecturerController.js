const moduleService = require("../services/moduleService");

const getLecturersModules = async (req, res) => {

        const lecturerId = req.user.userId; // decoded from the auth Middleware
        const modules = await moduleService.getLecturerModules(lecturerId);
        return res.status(200).json({ msg: "Modules retrieved successfully", modules: modules });

}

module.exports = { getLecturersModules }