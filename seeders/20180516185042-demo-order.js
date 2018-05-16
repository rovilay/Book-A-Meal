const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Orders', [
    {
      id: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      UserId: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
      deliveryAddress: '147 isuti rd',
      totalPrice: 1400,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: '3dde5a6b-7555-4a82-bd17-550e4e7ddb7c',
      UserId: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
      deliveryAddress: '50 isuti rd',
      totalPrice: 3000,
      createdAt: moment().format(),
      updatedAt: moment().format()
    }
  ])
  // down: (queryInterface, Sequelize) => {
  //    }
};
