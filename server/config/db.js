// const mongoose = require("mongoose");
import mongoose from "mongoose";
const connectDB = async () => {
  console.log("URI:", JSON.stringify(process.env.MONGODB_URI));
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.stack);
    process.exit(1);
  }
};

export default connectDB;
