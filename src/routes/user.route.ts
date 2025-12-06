import express from "express";
import {
  deleteMyAccount,
  getUserData,
  getPublicUserData,
} from "../controllers/user.controller.js";
import idProvider from "../middlewares/idProvider.js";

const userRouter = express.Router();
userRouter.post("/delete-my-account", idProvider, deleteMyAccount);
userRouter.get("/visit-my-account", idProvider, getUserData);
userRouter.get("/visit-user-account/:userId", getPublicUserData);

export default userRouter;
