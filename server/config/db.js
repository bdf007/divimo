const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function conection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log("Database is connected");
  } catch (error) {
    console.log("Could not connect to database", error);
  }
};
