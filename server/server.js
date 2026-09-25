// Load environment variables from .env file
require("dotenv").config({
    path: "./server/.env",
});

// Import Express application instance
const app = require("./src/app");

// Start server listener on specified port
 app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});
 
