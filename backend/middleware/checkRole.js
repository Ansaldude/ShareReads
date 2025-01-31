module.exports = function checkRole(requiredRole) {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized: No user found." });
            }

            if (req.user.role !== requiredRole) {
                return res.status(403).json({ success: false, message: "Forbidden: You do not have permission to access this resource." });
            }

            next(); // User has the correct role, proceed to the next middleware
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    };
};
