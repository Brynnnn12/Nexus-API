const express = require("express");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowStats,
} = require("../app/controllers/follow.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const { followValidation } = require("../app/Requests/follow.request");

const router = express.Router();

// Semua routes butuh auth
router.use(authenticate);

// Follow/unfollow
router.post("/:id/follow", followValidation, followUser);
router.delete("/:id/unfollow", followValidation, unfollowUser);

// Get followers/following
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

// Get follow stats
router.get("/:id/stats", getFollowStats);

module.exports = router;
