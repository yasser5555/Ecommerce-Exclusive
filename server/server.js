/*
 ! dotenv searches for .env in the current working directory (process.cwd()).
 ! Since the app is started from the project root (Execlusive_Ecommerce),
 ! we must explicitly point to server/.env. Otherwise process.env variables
 ! will be undefined because dotenv will look for Execlusive_Ecommerce/.env.
require("dotenv").config({
  path: "./server/.env",
  });
  console.log(process.cwd());

! console.log(process.env.EMAIL_PASS.length); it must be 16-char
*/
require("dotenv").config({
    path: "./server/.env",
});

const app = require("./src/app");
 app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});

