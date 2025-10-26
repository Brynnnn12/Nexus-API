const { body } = require("express-validator");

/**
 * Validation rules untuk register
 */
exports.registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name harus diisi")
    .isLength({ min: 2 })
    .withMessage("Name harus minimal 2 karakter"),
  body("email")
    .isEmail()
    .withMessage("Email yang valid diperlukan")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password harus minimal 6 karakter"),
  body("passwordConfirmation")
    .notEmpty()
    .withMessage("Password confirmation harus diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password konfirmasi tidak sesuai password");
      }
      return true;
    }),
];

/**
 * Validation rules untuk login
 */
exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];
