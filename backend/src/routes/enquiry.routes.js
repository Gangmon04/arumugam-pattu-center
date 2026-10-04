import express from "express";
import { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from "../controllers/enquiry.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Public customer enquiry
router.post("/", createEnquiry);

// Admin-only enquiry management
router.get("/", authMiddleware, adminMiddleware, getAllEnquiries);
router.get("/:id", authMiddleware, adminMiddleware, getEnquiryById);
router.patch("/:id", authMiddleware, adminMiddleware, updateEnquiry);
router.delete("/:id", authMiddleware, adminMiddleware, deleteEnquiry);

export default router;