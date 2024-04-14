import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import User from "../models/user.model.mjs";
import { v2 as cloudinary } from "cloudinary";
import { ErrorHandler } from "../utils/error.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerHandler = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new ErrorHandler("user already exists", 400));
  }

  const photo = req.file;
  if (!photo) {
    return next(new ErrorHandler("Please upload a photo", 400));
  }

  const b64 = Buffer.from(photo.buffer).toString("base64");
  let dataURI = `data:${photo.mimetype};base64,${b64}`;
  const cloudinaryRes = await cloudinary.uploader.upload(dataURI);
  req.body.avatar = cloudinaryRes.secure_url;
  const newUser = await User.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const userWithoutPassword = await User.findById(newUser._id).select(
    "-password"
  );
  res
    .status(201)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Registration Successful",
      userWithoutPassword,
    });
});

export const loginHandler = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const userWithoutPassword = await User.findById(existingUser._id).select(
    "-password"
  );
  const token = jwt.sign(
    { id: userWithoutPassword._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: `Sign In Successful`,
      userWithoutPassword,
    });
});

export const getProfileDetails = catchAsyncErrors(async (req, res) => {
  const userWithoutPassword = await User.findById(req.user).select("-password");
  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    userWithoutPassword,
  });
});

export const logoutHandler = catchAsyncErrors(async (req, res, next) => {
  return res
    .status(200)
    .cookie("access_token", "", {
      maxAge: 0,
    })
    .json({
      message: "Logged out successfully",
    });
});

export const getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find({});
  if (!users.length) return next(new ErrorHandler("No users found", 404));

  res.json(users);
});
