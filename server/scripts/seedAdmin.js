require("dotenv").config();

const connectDB = require("../config/db");
const User = require("../models/userModel");
const { hashedPassword } = require("../utils/password");

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;

    const adminPassword = process.env.ADMIN_PASSWORD;

    const adminName = process.env.ADMIN_NAME || "Super Admin";

    const adminPhone = process.env.ADMIN_PHONE;

    if (!adminEmail || !adminPassword || !adminPhone) {
      throw new Error(
        "ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_PHONE are required",
      );
    }

    const existingAdmin = await User.findOne({
      email: process.env.SEED_ADMIN_EMAIL,
      role: "admin",
    });

    if (existingAdmin) {
      console.log(`Admin already exists: ${adminEmail}`);
      return;
    }

    const password = await hashedPassword(
      process.env.SEED_ADMIN_PASSWORD,
      12,
    );

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password,
      role: "admin",
    });

    console.log(`Admin created successfully : ${admin.email}`);
  } catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    process.exit(0);
  }
};

seedAdmin();
