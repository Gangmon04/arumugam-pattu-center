import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  let name = "";
  let email = "";
  let password = "";

  // Check if passed via CLI args: node scripts/create-admin.js <email> <password> [name]
  const [argEmail, argPassword, argName] = process.argv.slice(2);

  if (argEmail && argPassword) {
    email = argEmail.trim().toLowerCase();
    password = argPassword.trim();
    name = (argName || "Admin").trim();
  } else {
    const rl = readline.createInterface({ input, output });

    try {
      console.log("\n=================================");
      console.log("   Arumugam Pattu Admin Creator  ");
      console.log("=================================\n");

      const nameInput = await rl.question("Enter Admin Name [Admin]: ");
      name = nameInput.trim() || "Admin";

      while (!email || !email.includes("@")) {
        email = (await rl.question("Enter Admin Email: ")).trim().toLowerCase();
        if (!email.includes("@")) {
          console.log("Please enter a valid email address.");
        }
      }

      while (!password || password.length < 6) {
        password = (await rl.question("Enter Admin Password (min 6 chars): ")).trim();
        if (password.length < 6) {
          console.log("Password must be at least 6 characters.");
        }
      }
    } finally {
      rl.close();
    }
  }

  try {
    console.log("\nHashing password and saving admin to database...");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword,
        role: "ADMIN"
      },
      create: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    console.log(`\n Success! Admin user ready:`);
    console.log(`   ID:    ${user.id}`);
    console.log(`   Name:  ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role:  ${user.role}\n`);
  } catch (error) {
    console.error("\n Error creating admin user:", error.message);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
