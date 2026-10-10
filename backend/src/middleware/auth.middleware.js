import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("Authorization token is required", 401));
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return next(new AppError("Invalid authorization format", 401));
    }

    if (!process.env.JWT_SECRET) {
      return next(new AppError("Server configuration error: JWT_SECRET missing", 500));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Session expired. Please log in again.", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid session token. Please log in again.", 401));
    }
    next(error);
  }
};

export default authMiddleware;