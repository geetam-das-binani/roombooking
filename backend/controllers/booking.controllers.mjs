import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import BookingModel from "../models/booking.model.mjs";
import RoomModel from "../models/room.model.mjs";
import { ErrorHandler } from "../utils/error.mjs";
export const createBookingHandler = catchAsyncErrors(async (req, res, next) => {
  const { roomId, date, startTime, endTime, members } = req.body;

  const room = await RoomModel.findById(roomId);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  const isAvailable = room.availability.some(
    (slot) =>
      slot.date.toDateString() === new Date(date).toDateString() &&
      slot.startTime === startTime &&
      slot.endTime === endTime &&
      !slot.isBooked
  );

  if (!isAvailable) {
    return next(
      new ErrorHandler("Room is not available for this date-time slot.", 400)
    );
  }
  const capacityPerBooking = 2; // Capacity per booking
  if (parseInt(members) > room.capacity) {
    return next(
      new ErrorHandler("Room is not available for too many guests.", 400)
    );
  }

  if (parseInt(members) > 2) {
    const noOfBookings = Math.ceil(parseInt(members) / capacityPerBooking);
    const bookings = [];
    let totalMembers = parseInt(members);
    for (let i = 0; i < noOfBookings; i++) {
      const booking = new BookingModel({
        user: req.user,
        roomId,
        date: new Date(date),
        startTime,
        endTime,
        paymentStatus: true,
        totalPrice:
          totalMembers <= 1
            ? room.price
            : parseInt(capacityPerBooking) * room.price,
      });
      bookings.push(booking);
      totalMembers -= capacityPerBooking;
    }
    const slotIndex = room.availability.findIndex(
      (slot) =>
        slot.date.toDateString() === new Date(date).toDateString() &&
        slot.startTime === startTime &&
        slot.endTime === endTime
    );
    room.availability[slotIndex].isBooked = true;

    await Promise.all(bookings.map((booking) => booking.save()));
    await room.save();
    return res.status(201).json({
      success: true,
      message: "Bookings created successfully",
    });
  }
  const booking = new BookingModel({
    user: req.user,
    roomId,
    date: new Date(date),
    startTime,
    endTime,
    totalPrice: parseInt(members) * room.price,
    paymentStatus: true,
  });

  const slotIndex = room.availability.findIndex(
    (slot) =>
      slot.date.toDateString() === new Date(date).toDateString() &&
      slot.startTime === startTime &&
      slot.endTime === endTime
  );

  room.availability[slotIndex].isBooked = true;

  await booking.save();
  await room.save();
  return res.status(201).json({
    success: true,
    message: "Booking created successfully",
  });
});

export const getMyBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await BookingModel.find({ user: req.user.toString() })
    .populate("user", "name email avatar")
    .populate("roomId");
  if (!bookings.length) {
    return next(new ErrorHandler("No bookings found", 400));
  }
  res.status(200).json({
    success: true,
    bookings,
  });
});

export const getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await BookingModel.find({}).sort({
    createdAt: -1,
  }).populate("roomId").populate("user", "name ");

  if(!bookings.length){
    return next(new ErrorHandler("No bookings found", 400));
  }
  res.status(200).json({
    success: true,
    bookings,
  });
});
