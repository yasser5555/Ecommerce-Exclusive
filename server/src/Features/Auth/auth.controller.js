const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
     const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  var Result;
  try {
    Result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(Result);
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
