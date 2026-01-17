const express = require("express");
const router = express.Router();

const lecturerController = require("../controllers/lecturerController");
const authenticateToken = require("../middleware/authMiddleware");

/**
 * GET /api/me/modules
 * Get all the modules under the specific lecturer currently logged in
 * Note : we need the lecturer's id from the middleware, to use as an identifier to query modules
 */
router.get(
  "/me/lecturer/modules",
  authenticateToken,
  lecturerController.getLecturersModules,
);

module.exports = router;
