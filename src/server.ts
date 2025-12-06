import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_URL,
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// error handler
app.use(errorHandler);

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("🚀 server running on port:-", port);
  });
};

export default startServer;
