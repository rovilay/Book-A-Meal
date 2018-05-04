module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  Order.associate = (models) => {
    Order.belongsToMany(models.Meal, {
      through: models.OrderMeal,
      as: 'orderId'
    });
    Order.belongsTo(models.User, {
      as: 'user',
    });
  };
  return Order;
};