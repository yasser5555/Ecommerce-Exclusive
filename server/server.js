// Load environment variables from .env file
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env"),
});

// Import Express application instance
const app = require("./src/app");

// Start server listener on specified port
const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(
    `Server running at http://${host}:${port}`
  );
});
 
