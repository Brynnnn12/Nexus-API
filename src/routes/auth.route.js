const express = require("express");
const {
  register,
  login,
  deleteAccount,
} = require("../app/controllers/auth.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../app/Requests/auth.request");

const router = express.Router();

// POST /auth/register
router.post("/register", registerValidation, register);

// POST /auth/login
router.post("/login", loginValidation, login);

// DELETE /auth/me - Delete account (butuh auth)
router.delete("/me", authenticate, deleteAccount);

module.exports = router;
