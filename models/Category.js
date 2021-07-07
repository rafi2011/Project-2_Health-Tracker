const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {};

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.String,
      allowNull: false,
    },
    meal_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'meal',
          key: 'id'
      }
  }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;