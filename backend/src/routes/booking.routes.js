import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  uploadBookingPhoto, 
  updateBookingStatus 
} from "../controllers/booking.controller.js";
import { uploadSareePhoto } from "../middleware/upload.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// 1. Customer booking pickup (Public)
router.post("/", createBooking);

// 2. Separate photo upload using memory buffer -> Cloudinary (Public)
router.post("/:id/photo", uploadSareePhoto, uploadBookingPhoto);

// 3. Admin dashboard leads fetch (Protected by JWT Auth & Admin Role)
router.get("/", authMiddleware, adminMiddleware, getAllBookings);

// 4. Admin update status (Protected by JWT Auth & Admin Role)
router.patch("/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);
router.patch("/:id", authMiddleware, adminMiddleware, updateBookingStatus);

export default router;
