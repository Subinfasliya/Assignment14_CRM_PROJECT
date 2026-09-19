require("dotenv").config();
const express = require("express");
const cors = require("cors");
 const cookieParser = require('cookie-parser')
const errorHandler = require("./middlewares/errorHandler");
const apiRouter = require("./routes");
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
