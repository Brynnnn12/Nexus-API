const { Post } = require("../../database/models");
const {
  formatPagingResponse,
} = require("../../utils/pagination/paginationHelper");

exports.findById = async (id) => {
  return await Post.findByPk(id, {
    attributes: ["id", "content", "userId", "createdAt"],
    include: [
      {
        model: require("../../database/models").User,
        as: "user",
        attributes: ["name"],
      },
    ],
  });
};

exports.findByUserId = async (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Post.findAndCountAll({
    where: { userId },
    attributes: ["id", "content", "userId", "createdAt"],
    include: [
      {
        model: require("../../database/models").User,
        as: "user",
        attributes: ["name"],
      },
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return formatPagingResponse({ count, rows }, page, limit);
};

exports.findAll = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Post.findAndCountAll({
    attributes: ["id", "content", "createdAt"],
    include: [
      {
        model: require("../../database/models").User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return formatPagingResponse({ count, rows }, page, limit);
};

exports.create = async (postData) => {
  return await Post.create(postData);
};

exports.updateById = async (id, updateData) => {
  const [affectedRows] = await Post.update(updateData, { where: { id } });
  return affectedRows > 0;
};

exports.deleteById = async (id) => {
  return await Post.destroy({ where: { id } });
};

exports.countByUserId = async (userId) => {
  return await Post.count({ where: { userId } });
};
