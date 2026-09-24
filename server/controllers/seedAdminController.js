const User = require("../models/userModel");
const { hashedPassword } = require("../utils/password");

const seedAdmin = async (req, res, next) => {
  try {
    // 1. Secret protection
    const seedSecret = req.headers["x-seed-secret"];

    if (!seedSecret || seedSecret !== process.env.ADMIN_SEED_SECRET) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    // 2. Admin details
    const { SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PHONE, SEED_ADMIN_PASSWORD } =
      process.env;

    if (!SEED_ADMIN_NAME || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PHONE || !SEED_ADMIN_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Admin environment variables are missing",
      });
    }

    // 3. Check existing admin

    const existingUser = await User.findOne({
      email: SEED_ADMIN_EMAIL,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // 4. Hash password

    const hashed = await hashedPassword(SEED_ADMIN_PASSWORD);

    // 5. Create admin
    const admin = await User.create({
      name: SEED_ADMIN_NAME,
      email: SEED_ADMIN_EMAIL,
      phone: SEED_ADMIN_PHONE,
      password: hashed,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  seedAdmin,
};
