// This is a "middleware factory" - it RETURNS the actual middleware
const authorizeRoles = (...allowedRoles) => {

  // allowedRoles = ['HOD', 'LECTURER'] (from the route definition)
  return (req, res, next) => {
    // Get the user's roles from the request
    // (This was added by authenticateToken middleware)
    const { userRoles } = req.user;
    // userRoles = [{userRole: 'STUDENT'}, {userRole: 'LECTURER'}]
    
    // Check if user has ANY of the allowed roles
    const hasPermission = userRoles.some(role => 
      allowedRoles.includes(role.userRole)
    );
    // hasPermission = true (because they have 'LECTURER')
    
    // Decide what to do
    if (!hasPermission) {
      // ❌ User doesn't have required role - STOP
      return res.status(403).json({ code: "Unsuccessful", msg: "Access denied" });
      // Request ENDS here
    }
    
    // ✅ User has permission - continue
    next(); // Move to next middleware/controller
  };
};