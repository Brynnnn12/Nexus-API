const express = require("express");
const authRoutes = require("./auth.route");
const profileRoutes = require("./profile.route");
const postRoutes = require("./post.route");
const followRoutes = require("./follow.route");
const likeRoutes = require("./like.route");

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// Profile routes
router.use("/profiles", profileRoutes);

// Post routes
router.use("/posts", postRoutes);

// Follow routes
router.use("/follows", followRoutes);

// Like routes
router.use("/likes", likeRoutes);

// Tambah routes lain di sini jika ada

module.exports = router;
