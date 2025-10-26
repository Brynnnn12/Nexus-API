const { body } = require("express-validator");

/**
 * Validation rules untuk create profile
 */
exports.createProfileValidation = [
  body("displayName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Display name max 100 characters"),
  body("bio")
    .optional()
    .isLength({ max: 160 })
    .withMessage("Bio max 160 characters"),
];

/**
 * Validation rules untuk update profile
 */
exports.updateProfileValidation = [
  body("displayName")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Display name max 100 characters"),
  body("bio")
    .optional()
    .isLength({ max: 160 })
    .withMessage("Bio max 160 characters"),
];
