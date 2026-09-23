require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const apiRouter = require("./routes");
const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === "production" && allowedOrigins.length === 0) {
  throw new Error("CLIENT_URL must be configured in production");
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed"));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server UP healthy" });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  const error = new Error(`API ${req.originalUrl} not found`);
  const statusCode = 404;

  return res.status(statusCode).json({
    success: false,
    error: error.message,
  });
});

app.use(errorHandler);

module.exports = app;
