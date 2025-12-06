import mongoose, { Document, Model } from "mongoose";
import Validator from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  posts: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: [true, "Username required"],
      maxlength: 16,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email required"],
      unique: true,
      index: true,
      validate: {
        validator: (email) => Validator.isEmail(email),
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
      select: false,
      validate: {
        validator: (password) =>
          Validator.isStrongPassword(password, {
            minLength: 10,
            minUppercase: 0,
            minSymbols: 0,
            minLowercase: 0,
            minNumbers: 0,
          }),
        message: "Please choose strong password at least 10 characters",
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true, autoIndex: false }
);

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 14);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);
export default User;
