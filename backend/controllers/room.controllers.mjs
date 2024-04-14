import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import { v2 as cloudinary } from "cloudinary";
import RoomModel from "../models/room.model.mjs";
import { ErrorHandler } from "../utils/error.mjs";

export const getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const rooms = await RoomModel.find({}).sort({ createdAt: -1 });
  if (!rooms.length) {
    return next(new ErrorHandler("No rooms found", 400));
  }
  res.status(200).json({
    success: true,
    rooms,
  });
});

export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return next(new ErrorHandler("roomId is required", 400));
  }
  const room = await RoomModel.findById(id);
  if (!room) {
    return next(new ErrorHandler("room not found", 400));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

export const getAllAvailableRooms = catchAsyncErrors(async (req, res, next) => {
  const allRooms = await RoomModel.find({
    availability: { $elemMatch: { isBooked: false } },
  });
  const transformedRooms = allRooms.map((room) => {
    return {
      ...room.toObject(),
      availability: room.availability.filter((item) => !item.isBooked),
    };
  });
  res.status(200).json({
    success: true,
    rooms: transformedRooms,
  });
});

export const createRoomHandler = catchAsyncErrors(async (req, res, next) => {
  const { capacity, description, date, startTime, endTime, price } = req.body;
  const photo = req.file;
  if (!photo) {
    return next(new ErrorHandler("Please upload a photo", 400));
  }
  const b64 = Buffer.from(photo.buffer).toString("base64");
  let dataURI = `data:${photo.mimetype};base64,${b64}`;
  const cloudinaryRes = await cloudinary.uploader.upload(dataURI);
  const newRoom = await RoomModel.create({
    capacity,
    description,
    availability: [
      {
        date: new Date(date),
        startTime,
        endTime,
      },
    ],
    price,
    roomImage: cloudinaryRes.secure_url,
  });
  if (!newRoom) {
    return next(new ErrorHandler("room not created", 400));
  }
  res.status(201).json({
    success: true,
    message: "Room created successfully",
  });
});
