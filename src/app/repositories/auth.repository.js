const { User } = require("../../database/models");

/**
 * Cari user berdasarkan email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

/**
 * Cari user berdasarkan ID
 * @param {string} id
 * @returns {Promise<User|null>}
 */
exports.findById = async (id) => {
  return await User.findByPk(id);
};

/**
 * Buat user baru
 * @param {object} userData - { name, email, password }
 * @param {object} options - Sequelize options
 * @returns {Promise<User>}
 */
exports.create = async (userData, options = {}) => {
  return await User.create(userData, options);
};

exports.deleteById = async (id) => {
  return await User.destroy({ where: { id } });
};
