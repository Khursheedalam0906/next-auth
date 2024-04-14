import mongoose from "mongoose";

export const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
