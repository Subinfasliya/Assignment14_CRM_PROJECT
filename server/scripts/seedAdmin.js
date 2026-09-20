require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/userModel");
const { hashedPassword } = require("../utils/password");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: process.env.SEED_ADMIN_EMAIL,
      role: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const hashPassword = await hashedPassword(
      process.env.SEED_ADMIN_PASSWORD,
      12,
    );

    const admin = await User.create({
      name: process.env.SEED_ADMIN_NAME,
      email: process.env.SEED_ADMIN_EMAIL,
      password: hashPassword,
      phone:process.env.SEED_ADMIN_PHONE,
      role: "admin",
    });

    console.log(`Admin created successfully : ${admin.email}`);
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
};


seedAdmin();