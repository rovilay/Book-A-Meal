require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME || 'postgres',
    password: process.env.PASSWORD,
    database: process.env.DEV_DB || 'book-me-a-meal',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: true
  },
  test: {
    username: process.env.TEST_USERNAME || 'postgres',
    password: process.env.PASSWORD,
    port: 5432,
    database: process.env.TEST_DB || 'book_a_meal_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
