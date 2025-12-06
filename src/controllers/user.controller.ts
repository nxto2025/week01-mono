import type { NextFunction, Request, Response } from "express";
import User from "../models/users.model.js";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

export const deleteMyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id: req.body.id }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = user.comparePassword(password);
    if (!user || !isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    await Post.deleteMany({ author: user._id });

    await Comment.deleteMany({ author: user._id });

    await Comment.deleteMany({ relatedPost: { $in: user.posts } });

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "User and related content deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details listed successfully ",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-email -comments -posts");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details listed successfully ",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
