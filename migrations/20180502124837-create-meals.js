module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'title'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'https://img.com'
      },
      UserId: {
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
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date('2100')
      }
    });

    await queryInterface.addConstraint(
      'Meals', ['title', 'UserId', 'deletedAt'],
      {
        type: 'unique',
        name: 'mealTitle'
      }
    );
  },

  down: queryInterface => queryInterface.dropTable('Meals')

};
