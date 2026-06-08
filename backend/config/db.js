const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI || process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL or MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
