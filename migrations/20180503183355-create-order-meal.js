module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderMeals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true
      },
      mealId: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true
      },
      portion: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }
  ),
  down: (queryInterface /* , Sequelize */) =>
  queryInterface.dropTable('OrderMeals')
  
};