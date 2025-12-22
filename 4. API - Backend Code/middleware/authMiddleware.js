const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../services/auth");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
      
    const token = authHeader && authHeader.split(" ")[1]; 
    if (!token) return res.status(401).json({ msg: "No token provided" });

    //check blacklist first
    const blacklisted = await tokenBlacklist.isTokenBlacklisted(token);
    if (blacklisted)
      return res.status(401).json({ msg: "Token has been revoked" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: "Invalid or expired token" });
      req.user = user;
      req.rawToken = token; // make raw token available for logout if needed
      next();
    });
  } catch (err) {
    console.error("authenticateToken error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = authenticateToken;
