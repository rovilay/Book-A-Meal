
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('OrderedMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      mealID: {
        type: Sequelize.UUID,
        allowNull: false
      },
      portion: {
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
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderedMeals')
  
};