const moment = require('moment');
// const UUID = require('uuid/v4');
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      firstName: 'John',
      lastName: 'Palmer',
      email: 'john@gmail.com',
      password: bcrypt.hashSync('1234567', 10),
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: true,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      firstName: 'deolu',
      lastName: 'Akinola',
      email: 'deoluAkinola@gmail.com',
      password: bcrypt.hashSync('1234567', 10),
      address: 'isuti rd',
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
      password: bcrypt.hashSync('1234567', 10),
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: false,
      createdAt: moment().format(),
      updatedAt: moment().format()
    },
    {
      id: '00a9914a-b32a-4314-bad4-867bd1240c5a',
      firstName: 'esther',
      lastName: 'Akinola',
      email: 'estherAkinola@gmail.com',
      password: bcrypt.hashSync('1234567', 10),
      address: 'isuti road',
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
