require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MogngoDB connection error:", error);
    process.exit(1); //exit process if connection fails
  }
};

connectDB();

module.exports = mongoose.connection;
