import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Attempt loading from backend/.env or root .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_c3hsmqnSy2Tp@ep-dawn-breeze-b54i341h-pooler.c-7.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;