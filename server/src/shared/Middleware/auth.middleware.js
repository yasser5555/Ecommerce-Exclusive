const jwt = require("jsonwebtoken");
const authRepository = require("../../Features/Auth/auth.repository");

// Protect private routes
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Note: Accessing user id From it use req.user.id
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Check whether the logged-in user is an admin.
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        isAdmin: false,
        message: "Unauthorized",
      });
    }

    const user = await authRepository.findUserById(req.user.id);
    const adminCheck = String(user?.role || "").toLowerCase() === "admin";

    req.user.isAdmin = adminCheck;
    req.isAdmin = adminCheck;

    if (!adminCheck) {
      return res.status(403).json({
        success: false,
        isAdmin: false,
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      isAdmin: false,
      message: `Admin check failed: ${error.message || error}`,
    });
  }
};

module.exports = {
  protect,
  isAdmin,
};
