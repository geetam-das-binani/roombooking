import { catchAsyncErrors } from "../utils/catchAsyncErrors.mjs";
import RoomModel from "../models/room.model.mjs";
import BookingModel from "../models/booking.model.mjs";
import UserModel from "../models/user.model.mjs";
export const getStats = catchAsyncErrors(async (req, res, next) => {
  const users = await UserModel.find({});

  const rooms = await RoomModel.find({});

  const bookings = await BookingModel.find({});

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
    users: users.length ? users : [],
    rooms: rooms.length ? rooms : [],
    bookings: bookings.length ? bookings : [],
    availableRooms: allRooms.length ? transformedRooms : [],
  });
});
