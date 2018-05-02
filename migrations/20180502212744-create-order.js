
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      totalPrice: {
        types: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
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
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};