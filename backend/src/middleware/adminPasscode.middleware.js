import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

const adminPasscodeMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("Authorization passcode required", 401));
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return next(new AppError("Invalid authorization format", 401));
    }

    const expectedPasscode = process.env.ADMIN_PASSCODE ? process.env.ADMIN_PASSCODE.trim() : null;

    // 1. Verify direct admin passcode
    if (expectedPasscode && token === expectedPasscode) {
      req.user = { role: "ADMIN" };
      return next();
    }

    // 2. Also accept valid admin JWT token
    if (process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded && (decoded.role === "ADMIN" || decoded.role === "STAFF")) {
          req.user = decoded;
          return next();
        }
      } catch (jwtErr) {
        // Token is neither valid passcode nor valid JWT
      }
    }

    return next(new AppError("Invalid Admin Passcode", 401));
  } catch (error) {
    next(error);
  }
};

export default adminPasscodeMiddleware;
