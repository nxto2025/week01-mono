import mongoose, { Document, Model } from "mongoose";
import validator from "validator";

interface IComment extends Document {
  postBody: string;
  author: mongoose.Types.ObjectId;
  relatedPost: mongoose.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    postBody: {
      type: String,
      maxlength: [5000, "Comment body should not exceed 5000 characters"],
      required: [true, "Comment body required"],
      trim: true,
      validate: {
        validator: (comment: string) => !validator.isEmpty(comment.trim()),
        message: "Comment can not be empty",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    relatedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
  },
  { timestamps: true, autoIndex: false }
);

const Comment: Model<IComment> =
  mongoose.models.post || mongoose.model<IComment>("comment", commentSchema);
export default Comment;
