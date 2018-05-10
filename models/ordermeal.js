
module.exports = (sequelize, DataTypes) => {
  const OrderMeal = sequelize.define('OrderMeal', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    MealId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    portion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  OrderMeal.associate = (/* models */) => {
    // associations can be defined here
  };
  return OrderMeal;
};
