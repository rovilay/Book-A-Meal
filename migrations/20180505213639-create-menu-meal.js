
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MenuMeals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    MenuId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    MealId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Meals',
        key: 'id'
      }
    },
    mealOwner: {
      type: Sequelize.UUID,
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
  down: queryInterface => queryInterface.dropTable('MenuMeals')
};
