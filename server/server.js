require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const validateProductionConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const requiredVariables = [
    "MONGO_URI",
    "CLIENT_URL",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
  ];
  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable],
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing production environment variables: ${missingVariables.join(", ")}`,
    );
  }

  for (const variable of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    if (process.env[variable].length < 32) {
      throw new Error(`${variable} must contain at least 32 characters`);
    }
  }
};

const startServer = async () => {
  try {
    validateProductionConfig();
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running successfully on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received, shutting down`);
      server.close(() => process.exit(0));
    };

    process.once("SIGTERM", () => shutdown("SIGTERM"));
    process.once("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error(`Server disconnected`, error.message);
    process.exitCode = 1;
  }
};

startServer();
