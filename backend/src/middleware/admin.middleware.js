import AppError from "../utils/AppError.js";

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError("Authentication required", 401)
    );
  }

  if (req.user.role !== "ADMIN") {
    return next(
      new AppError("Admin access required", 403)
    );
  }

  next();
};

export default adminMiddleware;