import mongoose from "mongoose";

export const database = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL);
  console.log(`db connection to ${connection.host}`);
};
