
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Order.associate = (models) => {
    Order.belongsToMany(models.Meal, {
      through: models.OrderedMeal
    });
    Order.belongsTo(models.User, {
      as: 'customer'
    });
  };
  return Order;
};