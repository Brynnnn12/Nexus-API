const { param } = require("express-validator");

/**
 * Validation rules untuk like/unlike
 */
exports.likeValidation = [param("id").isUUID().withMessage("post tidak valid")];
