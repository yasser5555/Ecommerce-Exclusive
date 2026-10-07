const authService = require("./auth.service");
const { protect } = require("../../shared/Middleware/auth.middleware");
const jwt = require("jsonwebtoken");

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const sendAuthResponse = (res, result, statusCode) => {
  if (!result?.token || !result?.user || result.user.error) {
    return res.status(statusCode === 201 ? 400 : 401).json({
      message: result?.error || "Authentication failed",
    });
  }

  const { token, user } = result;
  const safeUser = { ...user };
  delete safeUser.password;
  const expiresAt = jwt.decode(token)?.exp;
  const maxAge = expiresAt
    ? Math.max(0, expiresAt * 1000 - Date.now())
    : undefined;
  res.cookie("token", token, { ...authCookieOptions, maxAge });
  return res.status(statusCode).json({ user: safeUser });
};

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    sendAuthResponse(res, result, 201);
  } catch (error) {
    res.status(500).json({
      Error: `error at Auth.Controller.Register ${error}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const Result = await authService.login(req.body.email, req.body.password);
    sendAuthResponse(res, Result, 200);
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` });
  }
};

const getCurrentUser = [
  protect,
  async (req, res) => {
    try {
      const user = await authService.getUserById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (user.error) {
        throw new Error(user.error);
      }
      const safeUser = { ...user };
      delete safeUser.password;
      return res.status(200).json({ user: safeUser });
    } catch (error) {
      return res.status(500).json({
        message: `Unable to restore authentication session: ${error.message || error}`,
      });
    }
  },
];

const logout = (req, res) => {
  res.clearCookie("token", authCookieOptions);
  return res.status(200).json({ message: "Logged out successfully" });
};
const forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body.email);

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` });
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
};
