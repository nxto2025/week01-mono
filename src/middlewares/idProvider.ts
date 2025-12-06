import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.SECRET as string;

const idProvider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user not authorized",
      });
    }
    const decodedToken = jwt.verify(token, secret);
    if (typeof decodedToken === "object" && decodedToken?.id) {
      req.body.id = decodedToken.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "user not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

export default idProvider;
