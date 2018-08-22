const moment = require('moment');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Meals', [
    {
      id: 'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
      title: 'RICE AND BEANS',
      description: 'for john',
      price: 400,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: '3eac7448-bf1b-4400-b89a-9ac7bfe08015',
      title: 'POTATO',
      description: 'for john',
      price: 600,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: 'cb0e2e6c-76ad-4f66-b2c3-7b6c6981132c',
      title: 'CHOCOLATE CAKE',
      description: 'for john',
      price: 900,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: 'fad19c8c-8a42-423a-8e6f-7b8e17e191dc',
      title: 'SPAGHETTI',
      description: 'for john',
      price: 800,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: '4b78f553-e54d-4372-a20a-57f94e8402cd',
      title: 'PANCAKES',
      description: 'for john',
      price: 1400,
      image: 'https://img.com',
      UserId: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: '45246a33-d1cc-4cda-85ea-5d4c3cce28f0',
      title: 'RICE AND BEANS',
      description: 'for adeolu',
      price: 800,
      image: 'https://img.com',
      UserId: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: 'b8c4e098-e573-44eb-a918-052121f44cbb',
      title: 'SUGARCANE',
      description: 'for adeolu',
      price: 600,
      image: 'https://img.com',
      UserId: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: 'a79e4862-125d-48e3-b12a-87ccd8c7181c',
      title: 'JOLLOF RICE',
      description: 'for adeolu',
      price: 800,
      image: 'https://img.com',
      UserId: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: '8fe932be-4a93-44b6-ae38-a9da1be869b1',
      title: 'SALAD',
      description: 'for adeolu',
      price: 500,
      image: 'https://img.com',
      UserId: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format(),
    },
    {
      id: '60adb461-45dd-4d3a-860b-9e1cbd82bd1c',
      title: 'YAM AND EGG',
      description: 'for adeolu',
      price: 650,
      image: 'https://img.com',
      UserId: 'bb736d9c-4d44-4445-b895-018728f15f3a',
      createdAt: moment().format(),
      updatedAt: moment().format(),
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
