require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME || 'postgres',
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB || 'bookAMeal-dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_USERNAME || 'postgres',
    password: process.env.TEST_USERNAME || 'postgres',
    database: process.env.DEV_DB || 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_USERNAME || 'postgres',
    password: process.env.PROD_USERNAME || 'postgres',
    database: process.env.PROD_DB || 'postgres',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};