import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  uploadBookingPhoto, 
  updateBookingStatus 
} from "../controllers/booking.controller.js";
import { uploadSareePhoto } from "../middleware/upload.middleware.js";

const router = express.Router();

// Customer booking pickup
router.post("/", createBooking);

// 2. Separate photo upload using memory buffer -> Cloudinary
router.post("/:id/photo", uploadSareePhoto, uploadBookingPhoto);

// Admin dashboard leads fetch
router.get("/", getAllBookings);

// Admin update status (PENDING / COMPLETED)
router.patch("/:id/status", updateBookingStatus);
router.patch("/:id", updateBookingStatus);

export default router;

