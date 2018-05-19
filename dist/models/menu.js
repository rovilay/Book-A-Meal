'use strict';

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    postOn: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  Menu.associate = function (models) {
    Menu.belongsTo(models.User, { foreignKey: 'UserId', targetkey: 'id' });
    Menu.belongsToMany(models.Meal, { through: 'MenuMeal', foreignKey: 'MenuId', otherKey: 'MealId' });
  };
  return Menu;
};