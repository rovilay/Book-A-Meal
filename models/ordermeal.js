
module.exports = (sequelize, DataTypes) => {
  const OrderMeal = sequelize.define('OrderMeal', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    portion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  OrderMeal.associate = (models) => {
    OrderMeal.hasOne(models.Meal);
    OrderMeal.hasOne(models.Order);
  };
  return OrderMeal;
};