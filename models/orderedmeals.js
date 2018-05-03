
module.exports = (sequelize, DataTypes) => {
  const OrderedMeal = sequelize.define('OrderedMeal', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.INTEGER,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    mealID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    portion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  OrderedMeal.associate = (models) => {
    OrderedMeal.hasOne(models.Meal);
    OrderedMeal.hasOne(models.Order);
  };
  return OrderedMeal;
};