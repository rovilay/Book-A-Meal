'use strict';

module.exports = function (sequelize, DataTypes) {
  var MenuMeal = sequelize.define('MenuMeal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    MenuId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    MealId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  MenuMeal.associate = function () /* models */{};
  return MenuMeal;
};