
module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // DateJoined: {
      //   type: Sequelize.DATEONLY,
      //   allowNull: false,
      //   defaultValue: Sequelize.NOW
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
  
};