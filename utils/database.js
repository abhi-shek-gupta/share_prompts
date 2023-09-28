import mongoose from "mongoose";
let isConnected = false; // track the connection
export const connectToDB = async () => {
  // this will set the mongoose options, it's recommended to set it otherwise it will give you error in console
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("There is some error while connecting the MongoDB!");
    console.log(error);
  }
};
