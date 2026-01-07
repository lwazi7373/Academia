// This is a "middleware factory" - it RETURNS the actual middleware
const authorizeRoles = (...allowedRoles) => {

  // allowedRoles = ['HOD', 'LECTURER'] (from the route definition)
  return (req, res, next) => {
    // Get the user's roles from the request
    // (This was added by authenticateToken middleware)
    const { userRoles } = req.user;
    // userRoles = ['STUDENT', 'LECTURER'] or [{userRole: 'STUDENT'}, {userRole: 'LECTURER'}]
    
    // Check if user has ANY of the allowed roles
    // Handle both array of strings and array of objects
    const hasPermission = userRoles.some(role => {
      // If role is a string, compare directly
      if (typeof role === 'string') {
        return allowedRoles.includes(role);
      }
      // If role is an object, access the userRole property
      return allowedRoles.includes(role.userRole);
    });
    
    // Decide what to do
    if (!hasPermission) {
      // User doesn't have required role - STOP
      return res.status(403).json({
        code: "AUTH_FORBIDDEN",
        msg: "No permission - Access denied"
      });
      // Request ENDS here
    }
    
    // User has permission - continue
    next(); // Move to next middleware/controller
  };
};

// Export the middleware factory function
module.exports = authorizeRoles;