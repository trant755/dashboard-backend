require("dotenv").config();

const app = require("./app");
const { connectToSQL } = require("./models/connection");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToSQL();

    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server launch failed", err);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
