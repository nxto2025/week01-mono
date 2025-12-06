import mongoose, { Document, Model } from "mongoose";
import validator from "validator";

interface IPost extends Document {
  postBody: string;
  author: mongoose.Types.ObjectId;
  relatedComments: mongoose.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    postBody: {
      type: String,
      maxlength: [5000, "Post body should not exceed 5000 characters"],
      required: [true, "Post body required"],
      trim: true,
      validate: {
        validator: (post: string) => !validator.isEmpty(post.trim()),
        message: "Post can not be empty",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    relatedComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        index: true,
      },
    ],
  },
  { timestamps: true, autoIndex: false }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
export default Post;
