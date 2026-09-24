const express = require("express");

const {
  seedAdmin,
} = require("../../controllers/seedAdminController");

const seedRouter = express.Router();

seedRouter.post(
  "/admin",
  seedAdmin,
);

module.exports = seedRouter;