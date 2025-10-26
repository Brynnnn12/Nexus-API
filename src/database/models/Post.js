"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Belongs to User
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // Has many Likes
      Post.hasMany(models.Like, {
        foreignKey: "postId",
        as: "likes",
      });
    }
  }

  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      content: {
        type: DataTypes.STRING(280),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );

  return Post;
};
