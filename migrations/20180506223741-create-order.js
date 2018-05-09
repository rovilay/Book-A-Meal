module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Orders', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        UserId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        deliveryAddress: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        totalPrice: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
  down: (queryInterface /* , Sequelize */ ) =>
      queryInterface.dropTable('Orders')

};