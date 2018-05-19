const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      firstName: 'John',
      lastName: 'Palmer',
      email: 'john@gmail.com',
      password: '$2y$10$0A7bjWxAz3DoXfhBR4AffuWYFF53jfJt5IXrd96f9H3GeCBJapaga',
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: true,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
      firstName: 'Rose',
      lastName: 'Palmer',
      email: 'rose@gmail.com',
      password: '$2y$10$DHqeeJLD.Oa0/u.tVRAH9.P5eQirDWaG334coeEUzpaPpoHpVyQje',
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: false,
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
