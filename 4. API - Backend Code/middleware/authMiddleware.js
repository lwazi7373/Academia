const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Expected format: "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({
        code: "AUTH_NO_TOKEN",
        msg: "No authentication token provided"
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          code: "AUTH_INVALID_TOKEN",
          msg: "Invalid or expired authentication token"
        });
      }
      
      // Attach decoded payload to request object
      req.user = decoded; // Contains: { userId, userRoles }
      req.rawToken = token; // Store raw token if needed for logout
      
      next(); // Proceed to next middleware/controller
    });
    
  } catch (err) {
    console.error("authenticateToken error:", err);
    return res.status(500).json({ code: "SERVER_ERROR", msg: "Server error" });
  }
};

module.exports = authenticateToken;