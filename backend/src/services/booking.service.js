import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';


// In-memory fallback store in case database is temporarily disconnected during development
const localBookingsStore = [];

export const createBookingService = async (bookingData) => {
  const customerName = bookingData.customerName?.trim() || bookingData.name?.trim();
  const phone = bookingData.phone?.trim();
  const location = bookingData.location?.trim() || bookingData.address?.trim() || bookingData.pickupAddress?.trim();
  const sareeType = bookingData.sareeType?.trim();
  const pickupTime = bookingData.pickupTime?.trim();
  const notes = bookingData.notes?.trim() || bookingData.message?.trim();
  
  let coordsStr = null;
  if (bookingData.coords) {
    coordsStr = typeof bookingData.coords === "string" 
      ? bookingData.coords 
      : JSON.stringify(bookingData.coords);
  }

  // Validations
  if (!customerName) {
    throw new AppError("Customer name is required", 400);
  }

  if (!phone) {
    throw new AppError("Phone number is required", 400);
  }

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  if (cleanPhone.length < 10) {
    throw new AppError("Phone number must contain at least 10 digits", 400);
  }

  if (!sareeType) {
    throw new AppError("Saree type is required", 400);
  }

  let savedBooking = null;

  try {
    // 1. Create or link customer
    const customer = await prisma.customer.create({
      data: {
        name: customerName,
        phone: phone,
        address: location || null,
      },
    });

    // 2. Create enquiry
    const enquiry = await prisma.enquiry.create({
      data: {
        customerId: customer.id,
        sareeType: sareeType,
        numberOfSarees: 1,
        pickupRequired: true,
        pickupAddress: location || null,
        pickupTime: pickupTime || null,
        coords: coordsStr,
        message: notes || null,
        status: "PENDING",
      },
    });

    savedBooking = {
      id: enquiry.id,
      customerName: customer.name,
      phone: customer.phone,
      location: enquiry.pickupAddress,
      sareeType: enquiry.sareeType,
      pickupTime: enquiry.pickupTime,
      createdAt: enquiry.createdAt,
    };
  } catch (dbError) {
    console.warn("Database connection issue. Storing booking in memory fallback:", dbError.message);
    
    // In-memory fallback so user requests succeed even if local Postgres service is not yet started
    savedBooking = {
      id: localBookingsStore.length + 1,
      customerName,
      phone,
      location,
      sareeType,
      pickupTime,
      notes,
      coords: coordsStr,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };
    localBookingsStore.unshift(savedBooking);
  }

  return savedBooking;
};

export const getAllBookingsService = async () => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enquiries.map((enquiry) => ({
      id: enquiry.id,
      name: enquiry.customer?.name || "Customer",
      phone: enquiry.customer?.phone || "",
      location: enquiry.pickupAddress || enquiry.customer?.address || "Shared Live Location",
      coordinates: enquiry.coords,
      saree_type: enquiry.sareeType,
      sareeType: enquiry.sareeType,
      pickup_time: enquiry.pickupTime || "Not Specified",
      pickupTime: enquiry.pickupTime,
      notes: enquiry.message,
      status: enquiry.status || "Pending",
      created_at: enquiry.createdAt,
      createdAt: enquiry.createdAt,
      sareeImageUrl: enquiry.sareeImageUrl,

    }));
  } catch (dbError) {
    console.warn("Database fetch unavailable, returning memory store:", dbError.message);
    return localBookingsStore.map((b) => ({
      id: b.id,
      name: b.customerName,
      phone: b.phone,
      location: b.location || "Shared Live Location",
      coordinates: b.coords,
      saree_type: b.sareeType,
      sareeType: b.sareeType,
      pickup_time: b.pickupTime || "Not Specified",
      pickupTime: b.pickupTime,
      notes: b.notes,
      status: b.status || "Pending",
      created_at: b.createdAt,
      createdAt: b.createdAt,
      sareeImageUrl: b.sareeImageUrl || null,

    }));
  }
};

export const uploadBookingPhotoService = async (bookingId, fileBuffer) => {
  if (!fileBuffer) {
    throw new AppError('No photo provided for upload', 400);
  }

  // 1. Stream the RAM buffer directly into Cloudinary without touching disk
  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'arumugam_pattu_sarees',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Readable.from converts the Buffer into a readable stream natively
    Readable.from(fileBuffer).pipe(uploadStream);
  });

  const secureUrl = uploadResult.secure_url;
  const enquiryId = Number(bookingId);

  // 2. Save the Cloudinary URL to PostgreSQL
  try {
    const updatedEnquiry = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { sareeImageUrl: secureUrl },
    });

    return {
      id: updatedEnquiry.id,
      sareeImageUrl: updatedEnquiry.sareeImageUrl,
    };
  } catch (dbError) {
    console.warn('Database update fallback:', dbError.message);
    const inMem = localBookingsStore.find((b) => b.id === enquiryId);
    if (inMem) {
      inMem.sareeImageUrl = secureUrl;
    }
    return {
      id: enquiryId,
      sareeImageUrl: secureUrl,
    };
  }
};

export const updateBookingStatusService = async (bookingId, status) => {
  const enquiryId = Number(bookingId);
  const cleanStatus = status?.toUpperCase() === 'COMPLETED' ? 'COMPLETED' : 'PENDING';

  try {
    const updatedEnquiry = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { status: cleanStatus },
    });

    return {
      id: updatedEnquiry.id,
      status: updatedEnquiry.status,
    };
  } catch (dbError) {
    console.warn('Database status update fallback:', dbError.message);
    const inMem = localBookingsStore.find((b) => b.id === enquiryId);
    if (inMem) {
      inMem.status = cleanStatus;
    }
    return {
      id: enquiryId,
      status: cleanStatus,
    };
  }
};

