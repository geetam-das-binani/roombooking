
import express from "express";
import { verifyToken,authorizeRoles } from "../middlewares/auth.middleware.mjs";
import { createBookingHandler,getMyBookings,getAllBookings } from "../controllers/booking.controllers.mjs";
const router = express.Router();

router.post("/create-booking",verifyToken,createBookingHandler)
router.get("/my-bookings",verifyToken,getMyBookings)
router.get("/all-bookings",verifyToken,authorizeRoles,getAllBookings)
export { router  }