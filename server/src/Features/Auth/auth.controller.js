const authService = require("./auth.service");
const register = async (req, res ) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      Error:`error at Auth.Controller.Register ${error}` 
    });  }
};

const login = async (req, res, ) => {
  var Result;
  try {
    Result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(Result);
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` })
  }
};
const forgotPassword = async (req, res, ) => {
  try {
    await authService.forgotPassword(req.body.email);

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` })
  }
};

const resetPassword = async (req, res, ) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: `error at Auth.Controller.login ${error}` })
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
