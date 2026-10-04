import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const createEnquiryService = async (data) => {

  // Name validation
  if (!data.name || data.name.trim() === "") {
    throw new AppError("Customer name is required", 400);
  }

  // Phone validation
  if (!data.phone || data.phone.trim() === "") {
    throw new AppError("Customer phone is required", 400);
  }

  if (!/^[0-9]{10}$/.test(data.phone)) {
    throw new AppError("Phone number must contain exactly 10 digits", 400);
  }

  // Saree type validation
  if (!data.sareeType || data.sareeType.trim() === "") {
    throw new AppError("Saree type is required", 400);
  }

  // Number of sarees validation
  if (
    data.numberOfSarees === undefined ||
    data.numberOfSarees === null ||
    !Number.isInteger(data.numberOfSarees) ||
    data.numberOfSarees <= 0
  ) {
    throw new AppError("Number of sarees must be a positive whole number", 400);
  }

  // Email validation (only if provided)
  if (
    data.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    throw new AppError("Invalid email address", 400);
  }

  // Pickup validation
  if (data.pickupRequired === true) {
    if (!data.pickupAddress || data.pickupAddress.trim() === "") {
      throw new AppError(
        "Pickup address is required when pickup is requested",
        400
      );
    }
  }

  const customer = await prisma.customer.create({
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim(),
      address: data.address?.trim(),
    },
  });

  const enquiry = await prisma.enquiry.create({
    data: {
      customerId: customer.id,
      sareeType: data.sareeType.trim(),
      numberOfSarees: data.numberOfSarees,
      pickupRequired: data.pickupRequired ?? false,
      pickupAddress: data.pickupAddress?.trim(),
      message: data.message?.trim(),
    },
  });

  return {
    customer,
    enquiry,
  };
};

export const getAllEnquiriesService = async () => {
  const enquiries = await prisma.enquiry.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return enquiries;
};

export const getEnquiryByIdService = async (id) => {
  const enquiry = await prisma.enquiry.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
    },
  });

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  return enquiry;
};

export const updateEnquiryService = async (id, data) => {
  const enquiryId = Number(id);

  const existingEnquiry = await prisma.enquiry.findUnique({
    where: {
      id: enquiryId,
    },
  });

  if (!existingEnquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  const updatedEnquiry = await prisma.enquiry.update({
    where: {
      id: enquiryId,
    },
    data: {
      sareeType: data.sareeType,
      numberOfSarees: data.numberOfSarees,
      pickupRequired: data.pickupRequired,
      pickupAddress: data.pickupAddress,
      message: data.message,
      status: data.status,
    },
  });

  return updatedEnquiry;
};

export const deleteEnquiryService = async (id) => {
  const enquiryId = Number(id);

  const existingEnquiry = await prisma.enquiry.findUnique({
    where: {
      id: enquiryId,
    },
  });

  if (!existingEnquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  await prisma.enquiry.delete({
    where: {
      id: enquiryId,
    },
  });

  return {
    message: "Enquiry deleted successfully",
  };
};