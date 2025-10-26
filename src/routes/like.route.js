const express = require("express");
const {
  likePost,
  unlikePost,
  getLikesByPost,
  getLikesCount,
  getLikesByUser,
} = require("../app/controllers/like.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const { likeValidation } = require("../app/Requests/like.request");

const router = express.Router();

// Semua routes butuh auth
router.use(authenticate);

// Like/unlike
router.post("/:id/like", likeValidation, likePost);
router.delete("/:id/unlike", likeValidation, unlikePost);

// Get likes
router.get("/:id/likes", getLikesByPost);
router.get("/:id/likes/count", getLikesCount);

// Get user likes
router.get("/user/me", getLikesByUser);

module.exports = router;
