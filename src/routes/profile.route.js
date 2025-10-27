const express = require("express");
const {
  getProfile,
  getUserProfile,
  updateProfile,
} = require("../app/controllers/profile.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const { updateProfileValidation } = require("../app/Requests/profile.request");

const router = express.Router();

// GET /profiles/me - Get own profile (authenticated)
router.get("/me", authenticate, getProfile);

// Public route - view user profile by ID
router.get("/:id", getUserProfile);

// PUT /profiles - Update profile (authenticated)
router.put("/", authenticate, updateProfileValidation, updateProfile);

module.exports = router;
