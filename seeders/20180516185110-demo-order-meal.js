const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('OrderMeals', [
    {
      id: 15,
      OrderId: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      MealId: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      portion: 2,
      cost: 400,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 16,
      OrderId: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      MealId: '3eac7448-bf1b-4400-b89a-9ac7bfe08015',
      portion: 1,
      cost: 600,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 17,
      OrderId: '702a5034-8ea5-4251-a14c-9c59c01244a4',
      MealId: '45246a33-d1cc-4cda-85ea-5d4c3cce28f0',
      portion: 1,
      cost: 800,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 18,
      OrderId: '3dde5a6b-7555-4a82-bd17-550e4e7ddb7c',
      MealId: 'b8c4e098-e573-44eb-a918-052121f44cbb',
      portion: 1,
      cost: 600,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 19,
      OrderId: '3dde5a6b-7555-4a82-bd17-550e4e7ddb7c',
      MealId: 'a79e4862-125d-48e3-b12a-87ccd8c7181c',
      portion: 1,
      cost: 800,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 20,
      OrderId: '3dde5a6b-7555-4a82-bd17-550e4e7ddb7c',
      MealId: 'fad19c8c-8a42-423a-8e6f-7b8e17e191dc',
      portion: 2,
      cost: 800,
      createdAt: moment().format(),
      updatedAt: moment().format()
    }
  ])

  // down: (queryInterface, Sequelize) => {
  // }
};
