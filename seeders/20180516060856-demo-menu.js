const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Menus', [
    {
      id: '4158ae0d-1702-4eba-a5bf-b98a20e790e9',
      postOn: '2018-05-16',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: '516c187d-18dd-4dfc-b5cc-935d9e9a7e77',
      postOn: '2018-05-17',
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
