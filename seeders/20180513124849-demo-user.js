module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Palmer',
      email: 'john@gmail.com',
      password: '1234567',
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: true
    },
    {
      firstName: 'Rose',
      lastName: 'Palmer',
      email: 'rose@gmail.com',
      password: '1234567',
      address: '1 john street',
      Phone: '0909090909',
      city: 'ikeja',
      state: 'lagos',
      admin: false
    }], {});
  }
};
