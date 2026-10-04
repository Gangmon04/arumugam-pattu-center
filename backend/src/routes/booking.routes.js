import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  uploadBookingPhoto, 
  updateBookingStatus 
} from "../controllers/booking.controller.js";
import { uploadSareePhoto } from "../middleware/upload.middleware.js";
import adminPasscodeMiddleware from "../middleware/adminPasscode.middleware.js";

const router = express.Router();

// 1. Customer booking pickup (Public)
router.post("/", createBooking);

// 2. Separate photo upload using memory buffer -> Cloudinary (Public)
router.post("/:id/photo", uploadSareePhoto, uploadBookingPhoto);

// 3. Admin dashboard leads fetch (Protected by Admin Passcode)
router.get("/", adminPasscodeMiddleware, getAllBookings);

// 4. Admin update status (Protected by Admin Passcode)
router.patch("/:id/status", adminPasscodeMiddleware, updateBookingStatus);
router.patch("/:id", adminPasscodeMiddleware, updateBookingStatus);

export default router;


