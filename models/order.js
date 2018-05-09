
module.exports = (sequelize, DataTypes) => {  
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      dafaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'UserId', targetKey: 'id'
    });
    Order.belongsToMany(models.Meal, {
      through: 'OrderMeal', foreignKey: 'OrderId', otherKey: 'MealId'
    });
  };
  return Order;
};