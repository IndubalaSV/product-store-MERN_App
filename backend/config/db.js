import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//if .env is in root folder no path required
//else dotenv.config({ path: "./backend/.env" })

let connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI.replace("<db_password>", process.env.MONGO_PASSWORD)
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
