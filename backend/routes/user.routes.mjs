import express from "express";

const router = express.Router();
import { authorizeRoles, verifyToken } from "../middlewares/auth.middleware.mjs";
import { upload } from "../multer/multer.mjs";
import { registerHandler, loginHandler,getProfileDetails ,logoutHandler,getAllUsers} from "../controllers/user.controllers.mjs";
router.post("/register", upload.single("avatar"), registerHandler);
router.post("/login",   loginHandler);
router.post("/logout", logoutHandler);
router.get("/me", verifyToken, getProfileDetails);


// Admin Routes below
router.get("/allUsers", verifyToken, authorizeRoles, getAllUsers);
export { router };