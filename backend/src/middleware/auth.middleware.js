import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authorization token is required", 401);
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new AppError("Invalid authorization format", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;