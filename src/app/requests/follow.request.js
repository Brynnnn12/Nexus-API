const { param } = require("express-validator");

/**
 * Validation rules untuk follow/unfollow
 */
exports.followValidation = [
  param("id").isUUID().withMessage("ID user tidak valid"),
];
