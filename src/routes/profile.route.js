const express = require("express");
const {
  getProfile,
  getUserProfile,
  updateProfile,
} = require("../app/controllers/profile.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const { updateProfileValidation } = require("../app/Requests/profile.request");

const router = express.Router();

// Public route - view user profile by ID
router.get("/:id", getUserProfile);

// Semua routes butuh auth
router.use(authenticate);

// GET /profiles/me - Get own profile
router.get("/me", getProfile);

// PUT /profiles - Update profile
router.put("/", updateProfileValidation, updateProfile);

module.exports = router;
