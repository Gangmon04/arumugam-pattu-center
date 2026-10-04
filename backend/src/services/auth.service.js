import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const registerUserService = async (data) => {
  if (!data.name || data.name.trim() === "") {
    throw new Error("Name is required");
  }

  if (!data.email || data.email.trim() === "") {
    throw new Error("Email is required");
  }

  if (!data.password || data.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUserService = async (data) => {
  if (!data.email || !data.password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email.trim(),
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};