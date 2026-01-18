const moduleService = require("../services/moduleService");

/**
 * Get a single module by ID
 */
const getModuleById = async (req, res) => {
  const { moduleId } = req.params;

  const module = await moduleService.getModuleById(moduleId);

  res.status(200).json({
    msg: "Module retrieved successfully",
    module,
  });
};

module.exports = {
  getModuleById,
};
