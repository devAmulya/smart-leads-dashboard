import { Request, Response, NextFunction } from "express";

const adminMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  next();
};

export default adminMiddleware;