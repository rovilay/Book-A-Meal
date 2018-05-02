
module.exports = (sequelize, DataTypes) => {
  const OrderedMeals = sequelize.define('OrderedMeals', {
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
      types: DataTypes.UUID,
      allowNull: false
    },
    portion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  OrderedMeals.associate = function(models) {
    // associations can be defined here
  };
  return OrderedMeals;
};