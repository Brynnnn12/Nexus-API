const {
  responseError,
  responseNotFound,
} = require("../../../utils/globals/response");

class ErrorMiddleware {
  static handleError(err, req, res, next) {
    // Log error untuk debugging
    console.error("Error occurred:", err);

    // Jika error dari express-validator, kirim pesan validation
    if (err.name === "ValidationError") {
      return responseError(res, 400, err.errors, "Validation Error");
    }

    // Jika error dari database (misalnya Sequelize)
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map((e) => e.message);
      return responseError(res, 400, messages, "Validasi database gagal");
    }

    // Jika error dari JWT
    if (err.name === "JsonWebTokenError") {
      return responseError(res, 401, null, "Token tidak valid");
    }

    // Default error handling
    const message = err.message || "Server Bermasalah";
    return responseError(res, 500, null, message);
  }

  static handleNotFound(req, res, next) {
    return responseNotFound(res, "Endpoint tidak ditemukan");
  }
}

module.exports = ErrorMiddleware;
