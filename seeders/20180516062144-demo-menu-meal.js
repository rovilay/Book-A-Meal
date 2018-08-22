const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('MenuMeals', [
    {
      id: 1,
      MenuId: '4158ae0d-1702-4eba-a5bf-b98a20e790e9',
      MealId: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      mealOwner: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 8,
      MenuId: '4158ae0d-1702-4eba-a5bf-b98a20e790e9',
      MealId: '3eac7448-bf1b-4400-b89a-9ac7bfe08015',
      mealOwner: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 9,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: '45246a33-d1cc-4cda-85ea-5d4c3cce28f0',
      mealOwner: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 10,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: 'b8c4e098-e573-44eb-a918-052121f44cbb',
      mealOwner: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 11,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: 'a79e4862-125d-48e3-b12a-87ccd8c7181c',
      mealOwner: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 12,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: 'fad19c8c-8a42-423a-8e6f-7b8e17e191dc',
      mealOwner: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 13,
      MenuId: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      MealId: '45246a33-d1cc-4cda-85ea-5d4c3cce28f0',
      mealOwner: 'bb736d9c-4d44-4445-b895-018728f15f3a',
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
