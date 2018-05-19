const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('MenuMeals', [
    {
      id: 1,
      MenuId: '4158ae0d-1702-4eba-a5bf-b98a20e790e9',
      MealId: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 8,
      MenuId: '4158ae0d-1702-4eba-a5bf-b98a20e790e9',
      MealId: '4b62aed4-2610-4340-97ae-c27a8136c2ff',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 9,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: '4b62aed4-2610-4340-97ae-c27a8136c2ff',
      createdAt: moment().format(),
      updatedAt: moment().format()
    }
  ]),

  // down: (queryInterface, Sequelize) => {
  //   /*
  //     Add reverting commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkDelete('Person', null, {});
  //   */
  // }
};
