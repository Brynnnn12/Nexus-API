/**
 * Middleware untuk parsing pagination dari query params
 */
exports.pagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Validasi dasar
  if (page < 1) req.query.page = 1;
  if (limit < 1 || limit > 100) req.query.limit = 10; // Max 100

  req.pagination = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    offset:
      ((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.limit) || 10),
  };

  next();
};
