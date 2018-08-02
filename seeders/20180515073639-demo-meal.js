const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Meals', [
    {
      id: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      title: 'RICE AND BEANS',
      description: 'So delicious',
      price: 400,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: '4b62aed4-2610-4340-97ae-c27a8136c2ff',
      title: 'YAM AND EGG',
      description: 'So delicious',
      price: 650,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
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
