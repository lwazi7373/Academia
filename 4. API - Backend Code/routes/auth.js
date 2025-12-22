const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authenticateToken = require('../middleware/authMiddleware');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/logout').post(authenticateToken, authController.logout);

module.exports = router;