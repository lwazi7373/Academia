const express = require("express");
const router = express.Router();

const moduleController = require("../controllers/moduleController");

// GET /api/modules/:moduleId
router.get("/:moduleId", moduleController.getModuleById);

module.exports = router;
