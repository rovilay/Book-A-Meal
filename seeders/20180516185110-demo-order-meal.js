const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('OrderMeals', [
    {
      id: 5,
      OrderId: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      MealId: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      portion: 2,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 6,
      OrderId: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      MealId: '4b62aed4-2610-4340-97ae-c27a8136c2ff',
      portion: 1,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 7,
      OrderId: '3dde5a6b-7555-4a82-bd17-550e4e7ddb7c',
      MealId: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      portion: 4,
      createdAt: moment().format(),
      updatedAt: moment().format()
    }
  ])

  // down: (queryInterface, Sequelize) => {
  // }
};
