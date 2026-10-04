import express from "express";
import { createBooking, getAllBookings,uploadBookingPhoto  } from "../controllers/booking.controller.js";
import { uploadSareePhoto } from "../middleware/upload.middleware.js";

const router = express.Router();

// Customer booking pickup
router.post("/", createBooking);

// 2. Separate photo upload using memory buffer -> Cloudinary
router.post("/:id/photo", uploadSareePhoto, uploadBookingPhoto);

// Admin dashboard leads fetch
router.get("/", getAllBookings);

export default router;
