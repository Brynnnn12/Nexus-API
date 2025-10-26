const express = require("express");
const {
  getPost,
  getAllPosts,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
} = require("../app/controllers/post.controller");
const { authenticate } = require("../app/middlewares/auth/auth.middleware");
const {
  pagination,
} = require("../app/middlewares/globals/pagination.middleware");
const {
  createPostValidation,
  updatePostValidation,
} = require("../app/Requests/post.request");

const router = express.Router();

// Public routes
router.get("/", pagination, getAllPosts); // Get all posts with pagination
router.get("/:id", getPost); // Get single post

// Protected routes
router.use(authenticate);
router.get("/user/me", pagination, getPostsByUser); // Get own posts
router.post("/", createPostValidation, createPost); // Create post
router.put("/:id", updatePostValidation, updatePost); // Update post
router.delete("/:id", deletePost); // Delete post

module.exports = router;
