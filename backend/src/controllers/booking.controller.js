import {
  createBookingService,
  getAllBookingsService,
  uploadBookingPhotoService,
  updateBookingStatusService,
} from "../services/booking.service.js";

export const createBooking = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.body);

    res.status(201).json({
      success: true,
      message: "Pickup enquiry created successfully",
      data: {
        id: booking.id,
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const leads = await getAllBookingsService();

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
      leads: leads,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBookingPhoto = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const result = await uploadBookingPhotoService(id, req.file.buffer);

    res.status(200).json({
      success: true,
      message: "Saree photo uploaded to cloud successfully",
      data: {
        bookingId: result.id,
        sareeImageUrl: result.sareeImageUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await updateBookingStatusService(id, status);

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

