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

    const expectedPasscode = (process.env.ADMIN_PASSCODE || "Arumugam123").trim();

    // 1. Verify direct admin passcode
    if (token === expectedPasscode) {
      req.user = { role: "ADMIN" };
      return next();
    }

    // 2. Also accept valid admin JWT token
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "pattu_sarees_development_secret_2026"
      );
      if (decoded && (decoded.role === "ADMIN" || decoded.role === "STAFF")) {
        req.user = decoded;
        return next();
      }
    } catch (jwtErr) {
      // Token is neither valid passcode nor valid JWT
    }

    return next(new AppError("Invalid Admin Passcode", 401));
  } catch (error) {
    next(error);
  }
};

export default adminPasscodeMiddleware;
