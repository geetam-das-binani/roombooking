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
  }).sort({ createdAt: -1 });
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
    price,

    roomId,
    existingImage,
  } = req.body;
  if (!roomId) {
    return next(new ErrorHandler("roomId is required", 400));
  }
  if (parseInt(capacity) > 2 || parseInt(capacity) < 1) {
    return next(new ErrorHandler("Room capacity is min 1 and max 2", 400));
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
    price,
    roomImage: cloudinaryRes || existingImage,
  };
  const room = await RoomModel.findById(roomId);
  await RoomModel.findByIdAndUpdate(roomId, { $set: updatedObject });

  const existingBookingsWithRoomId = await BookingModel.find({
    roomId,
  });
  if (existingBookingsWithRoomId.length) {
    for (let i = 0; i < existingBookingsWithRoomId.length; i++) {
      const element = existingBookingsWithRoomId[i];
      element.totalPrice = (element.totalPrice / room.price) * parseInt(price);
      await element.save();
    }
  }

  return res.status(200).json({
    success: true,
    message: "Room updated successfully",
  });
});

export const addAvailability = catchAsyncErrors(async (req, res, next) => {
  const { roomId, date, startTime, endTime } = req.body;

  if (!roomId) return next(new ErrorHandler("Room id is required", 400));

  const room = await RoomModel.findByIdAndUpdate(roomId, {
    $push: {
      availability: {
        date: new Date(date),
        startTime,
        endTime,
      },
    },
  });
  if (!room) return next(new ErrorHandler("Room not found", 404));
  return res.status(200).json({
    success: true,
    message: "Availability added successfully",
  });
});

export const updateAvailability = catchAsyncErrors(async (req, res, next) => {
  const { roomId, date, startTime, endTime, availabilityId } = req.body;
  if (!roomId || !availabilityId) {
    return next(
      new ErrorHandler("roomId and availabilityId are required", 400)
    );
  }
  let existingRoom = await RoomModel.findById(roomId);
  if (!existingRoom) {
    return next(new ErrorHandler("Room not found", 404));
  }
  const existingAvalability = existingRoom?.availability?.find(
    (elem) => elem._id.toString() === availabilityId.toString()
  );
  const updatedAvailability = existingRoom?.availability?.map((item) =>
    item._id.toString() === availabilityId.toString()
      ? { ...item, startTime, endTime, date: new Date(date) }
      : item
  );

  const existingBookingsWithRoomId = await BookingModel.countDocuments({
    roomId,
    startTime: existingAvalability?.startTime,
    endTime: existingAvalability?.endTime,
    date: new Date(existingAvalability?.date),
  });

  existingRoom.availability = updatedAvailability;
  await existingRoom.save();

  if (!existingBookingsWithRoomId)
    return res.status(200).json({
      success: true,
      message: "Availability updated successfully",
    });

  await BookingModel.updateMany(
    {
      roomId,
      startTime: existingAvalability?.startTime,
      endTime: existingAvalability?.endTime,
      date: new Date(existingAvalability?.date),
    },
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
    message: "Availability updated successfully",
  });
});
