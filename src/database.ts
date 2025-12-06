import mongoose from "mongoose";
import User from "./models/users.model.js";
import Post from "./models/posts.model.js";
import Comment from "./models/comments.model.js";

const databaseConnection = async () => {
  const uri = process.env.DATABASE_URI as string;
  try {
    await mongoose.connect(uri, {
      dbName: "mydatabase-week01",
    });
    console.log("✅ database connected");

    await User.syncIndexes();
    console.log("[01] Users indexes synchronized");

    await Post.syncIndexes();
    console.log("[02] Posts indexes synchronized");

    await Comment.syncIndexes();
    console.log("[03] Comments indexes synchronized");
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message });
    }
    console.log(error);
  }
};

export default databaseConnection;
