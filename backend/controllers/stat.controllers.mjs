import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import RoomModel from "../models/room.model.mjs";
import BookingModel from "../models/booking.model.mjs";
import UserModel from "../models/user.model.mjs";
export const getStats = catchAsyncErrors(async (req, res, next) => {
  const users = await UserModel.find({});
  if (!users.length) return next(new ErrorHandler("No users found", 404));
  const rooms = await RoomModel.find({});
  if (!rooms.length) return next(new ErrorHandler("No rooms found", 404));
  const bookings = await BookingModel.find({});
  if (!bookings.length) return next(new ErrorHandler("No bookings found", 404));

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
    users,
    rooms,
    bookings,
    availableRooms: transformedRooms,
  });
});
