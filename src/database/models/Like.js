"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // Like belongs to User
      Like.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // Like belongs to Post
      Like.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }

  Like.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "likes",
    }
  );

  return Like;
};
