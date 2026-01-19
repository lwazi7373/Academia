const express = require("express");
const router = express.Router();

const moduleController = require("../controllers/moduleController");

// GET a particular module
router.get("module/:moduleId", moduleController.getModuleById);

module.exports = router;
