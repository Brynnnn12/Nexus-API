/**
 * Memformat respons pagination
 * @param {object} dataFromFindAndCountAll - Hasil dari Sequelize 'findAndCountAll' ({ count, rows })
 * @param {number} page - Halaman saat ini (dari req.pagination)
 * @param {number} limit - Limit per halaman (dari req.pagination)
 * @returns {object} - Objek respons pagination yang terformat
 */
exports.formatPagingResponse = (dataFromFindAndCountAll, page, limit) => {
  const { count, rows } = dataFromFindAndCountAll;

  const totalItems = count;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;

  return {
    data: rows, // array langsung
    meta: {
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: currentPage,
      limit: limit,
    },
  };
};
