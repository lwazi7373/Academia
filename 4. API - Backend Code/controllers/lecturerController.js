const moduleService = require("../services/moduleService");

/**
 * Fetches all the modules the coordinator is responsible for
 * @param {*} req
 * @param {*} res
 * @returns modules
 */
const getLecturersModules = async (req, res) => {
  const lecturerId = req.user.userId; // decoded from the auth Middleware
  const modules = await moduleService.getLecturerModules(lecturerId);
  return res
    .status(200)
    .json({ msg: "Modules retrieved successfully", modules: modules });
};

module.exports = { getLecturersModules };
