import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount application API routes
app.use("/api/test", testRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);

// Central error handler
app.use(errorMiddleware);

export default app;