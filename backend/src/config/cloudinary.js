import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Attempt loading from backend/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD || 'ncqqtugv';
const apiKey = process.env.CLOUDINARY_API_KEY || '815921852182339';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'fN1UqWEmyj226u_MyY_LARY6lWY';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true, // Always use HTTPS
});

export default cloudinary;