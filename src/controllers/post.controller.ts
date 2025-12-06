import type { NextFunction, Request, Response } from "express";
import Post from "../models/posts.model.js";
import Comment from "../models/comments.model.js";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postBody } = req.body;
  if (!postBody) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  try {
    await Post.create({ postBody, author: req.body.id });
    return res
      .status(201)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body.id;
  try {
    await Post.findByIdAndDelete(postId);
    await Comment.deleteMany({ relatedPost: postId });
    return res
      .status(200)
      .json({ success: true, message: "Post and related comments deleted" });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId, postBody } = req.body;
  try {
    await Post.findByIdAndUpdate(
      postId,
      { postBody },
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await Post.find()
      .populate("author", "username")
      .populate("relatedComments")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All posts listed successfully",
      data: allPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPosts = await Post.find({ author: req.body.id })
      .populate("author", "username")
      .populate("relatedComments")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All user posts listed successfully",
      data: userPosts,
    });
  } catch (error) {
    next(error);
  }
};
