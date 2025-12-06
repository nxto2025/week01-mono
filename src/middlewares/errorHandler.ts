import type { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    console.error({
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
  console.error(error);
};

export default errorHandler;
