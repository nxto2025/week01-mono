import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import idProvider from "../middlewares/idProvider.js";

const postRouter = express.Router();

postRouter.post("/create", idProvider, createPost);
postRouter.post("/update", idProvider, updatePost);
postRouter.post("/delete", idProvider, deletePost);
postRouter.get("/feed", getAllPosts);
postRouter.get("/user-posts", idProvider, getUserPosts);

export default postRouter;
