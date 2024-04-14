import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { errorMiddleware } from "./middlewares/error.middlware.mjs";
import { router as userRoutes } from "./routes/user.routes.mjs";
import { router as roomRoutes } from "./routes/room.route.mjs";
import { router as bookingRoutes } from "./routes/booking.route.mjs";
import { router as statsRoute } from "./routes//dashboardstats.routes.mjs";
import cors from 'cors'
import { connectToDB } from "./db/db.mjs";
dotenv.config();
const app = express();
const port = process.env.PORT || 7001;
app.use(cors({
  origin:true,
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", roomRoutes);
app.use("/api/v1", bookingRoutes);
app.use("/api/v1", statsRoute);

app.use(errorMiddleware);

connectToDB()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(` server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
