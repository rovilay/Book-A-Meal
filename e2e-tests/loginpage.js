import 'babel-polyfill';
import db from '../models';
import userData from '../server/helpers/test-data/users';

const {
  adminUser1
} = userData;

module.exports = {
  before: async () => {
    await db.User.truncate();
    await db.User.create(adminUser1);
  },
  beforeEach: (browser) => {
    browser.maximizeWindow();
  },
  after: async () => {
    await db.User.truncate();
  },
  'User should be logged in if already registered`': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(1)')
      .waitForElementVisible('.loginpage', 1000)
      .setValue('#login-email', `${adminUser1.email}`)
      .pause(1000)
      .setValue('#login-password', '1234567')
      .waitForElementVisible('.loginbtn', 1000)
      .pause(2000)
      .click('.loginbtn')
      .pause(2000)
      .assert.containsText('.merienda', `Welcome ${adminUser1.firstName} ${adminUser1.lastName}`)
      .pause(2000)
      .end();
  },
  'It should return error if email does not exist`': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(1)')
      .waitForElementVisible('.loginpage', 1000)
      .setValue('#login-email', 'rovilay@gmail.com')
      .setValue('#login-password', '1234567')
      .waitForElementVisible('.loginbtn', 1000)
      .pause(2000)
      .click('.loginbtn')
      .waitForElementVisible('.toast-danger', 3000)
      .pause(2000)
      .end();
  },
  'It should return error if password is wrong`': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(1)')
      .waitForElementVisible('.loginpage', 1000)
      .setValue('#login-email', `${adminUser1.email}`)
      .setValue('#login-password', '123456')
      .waitForElementVisible('.loginbtn', 1000)
      .pause(2000)
      .click('.loginbtn')
      .waitForElementVisible('.toast-danger', 3000)
      .pause(2000)
      .end();
  }
};
