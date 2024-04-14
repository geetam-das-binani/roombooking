import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import { v2 as cloudinary } from "cloudinary";
import RoomModel from "../models/room.model.mjs";
import { ErrorHandler } from "../utils/error.mjs";
import BookingModel from "../models/booking.model.mjs";
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

export const updateRoom = catchAsyncErrors(async (req, res, next) => {
  const {
    capacity,
    description,
    date,
    startTime,
    endTime,
    price,
    isBooked,
    roomId,
    existingImage,
  } = req.body;
  if (!roomId) {
    return next(new ErrorHandler("roomId is required", 400));
  }

  const photo = req.file;
  let cloudinaryRes = "";
  if (photo) {
    const b64 = Buffer.from(photo.buffer).toString("base64");
    let dataURI = `data:${photo.mimetype};base64,${b64}`;
    let res = await cloudinary.uploader.upload(dataURI);
    cloudinaryRes = res.secure_url;
  }

  const updatedObject = {
    capacity,
    description,
    availability: [
      {
        date: new Date(date),
        startTime,
        endTime,
        isBooked,
      },
    ],
    price,
    roomImage: cloudinaryRes || existingImage,
  };
  await RoomModel.findByIdAndUpdate(roomId, {
    $set: updatedObject,
  });
  const existingBookingsWithRoomId = await BookingModel.countDocuments({
    roomId,
  });
  if (!existingBookingsWithRoomId)
    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
    });

  await BookingModel.updateMany(
    { roomId },
    {
      $set: {
        startTime,
        endTime,
        date: new Date(date),
      },
    }
  );

  return res.status(200).json({
    success: true,
    message: "Room updated successfully",
  });
});
