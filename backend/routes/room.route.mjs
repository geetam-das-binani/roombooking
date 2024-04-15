import express from "express";
import {
  verifyToken,
  authorizeRoles,
} from "../middlewares/auth.middleware.mjs";
import {
  createRoomHandler,
  getAllRooms,
  getSingleRoom,
  getAllAvailableRooms,
  updateRoom,
  addAvailability,
  updateAvailability,
} from "../controllers/room.controllers.mjs";
import { upload } from "../multer/multer.mjs";
const router = express.Router();

router.get("/rooms", getAllRooms);
router.get("/single-room/:id", getSingleRoom);
router.post(
  "/create-room",
  verifyToken,
  authorizeRoles,
  upload.single("roomImage"),
  createRoomHandler
);
router.get("/all-rooms", verifyToken, authorizeRoles, getAllRooms);
router.get(
  "/available-rooms",
  verifyToken,
  authorizeRoles,
  getAllAvailableRooms
);
router.post(
  "/update-room",
  verifyToken,
  authorizeRoles,
  upload.single("roomImage"),
  updateRoom
);
router.post("/add-availability", verifyToken, authorizeRoles, addAvailability);
router.post(
  "/update-availability",
  verifyToken,
  authorizeRoles,
  updateAvailability
);
export { router };
