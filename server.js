require("dotenv").config();

// const connection = require("./models/connection.js");
const app = require("./app");
const connection = require("./models/connection");

const PORT = process.env.PORT || 3000;
console.log(PORT);

const start = async () => {
  try {
    // await connection();
    // console.log(connection);

    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server launch failed", err);
      }

      console.log(`Server running. Use our API on port: ${PORT}`);
      //   console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
