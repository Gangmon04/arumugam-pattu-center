import {
  createEnquiryService,
  getAllEnquiriesService,
  getEnquiryByIdService,
  updateEnquiryService,
  deleteEnquiryService,
} from "../services/enquiry.service.js";

export const createEnquiry = async (req, res, next) => {
  try {
    const result = await createEnquiryService(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await getAllEnquiriesService();

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await getEnquiryByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await updateEnquiryService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    await deleteEnquiryService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};