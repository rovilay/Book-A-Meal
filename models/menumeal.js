
module.exports = (sequelize, DataTypes) => {
  const MenuMeal = sequelize.define('MenuMeal', {
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
      allowNull: false,
    },
    mealOwner: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  MenuMeal.associate = (/* models */) => {
  };
  return MenuMeal;
};
