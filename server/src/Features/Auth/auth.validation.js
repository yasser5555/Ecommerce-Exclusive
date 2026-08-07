const { body } =require("express-validator");
const registerValidation = [
    // Check if any parameter of body is empty and if true then send Err-msg
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    // Check if Password-parameter is atleast 6 character otherwise send Error-message
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
    // Check if the Email-parameter is email or not and if false send error-msg
    body("email").isEmail().withMessage("Invalid email"),  
    // Check if the password-parameter is empty or not and if false send error-msg
  body("password").notEmpty(),
];

module.exports = {registerValidation,loginValidation,};