
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerId: {
      types: DataTypes.UUID,
      allowNull: false
    },
    totalPrice: {
      types: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.Now
    }
  });
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};