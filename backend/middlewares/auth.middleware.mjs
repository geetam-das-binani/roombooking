import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import { ErrorHandler } from "../utils/error.mjs";
import jwt from "jsonwebtoken";
import User  from "../models/user.model.mjs";


export const verifyToken = catchAsyncErrors(
  async (req,res,next) => {
    const token = req.cookies["access_token"];

    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET );

      if (!decodedData) {
        return next(new ErrorHandler("Invalid token", 401));
      }
      req.user = decodedData .id;
      next();
    } catch (error) {
      return next(new ErrorHandler(error.message, 401));
    }
  }
);

export const authorizeRoles = async (
  req,
  res,
  next,
) => {
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }

  next();
};
