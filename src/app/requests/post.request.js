const { body } = require("express-validator");

/**
 * Validation rules untuk create post
 */
exports.createPostValidation = [
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 280 })
    .withMessage("Content max 280 characters"),
];

/**
 * Validation rules untuk update post
 */
exports.updatePostValidation = [
  body("content")
    .optional()
    .isLength({ max: 280 })
    .withMessage("Content max 280 characters"),
];
