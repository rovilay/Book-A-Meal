import 'babel-polyfill';
import db from '../models';
import userData from '../server/helpers/test-data/users';

const {
  adminUser1,
} = userData;

module.exports = {
  before: async () => {
    await db.User.truncate();
  },
  beforeEach: (browser) => {
    browser.maximizeWindow();
  },
  after: async () => {
    await db.User.truncate();
  },
  'User should be registered in if all input fields are filled correctly`': (browser) => {
    browser
      .maximizeWindow()
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(2)')
      .waitForElementVisible('.signuppage', 1000)
      .setValue('#signup-fname', `${adminUser1.firstName}`)
      .setValue('#signup-lname', `${adminUser1.lastName}`)
      .setValue('#signup-email', `${adminUser1.email}`)
      .setValue('#signup-role', 'Caterer')
      .setValue('#signup-phone', `${adminUser1.Phone}`)
      .setValue('#signup-address', `${adminUser1.address}`)
      .setValue('#signup-psw', `${adminUser1.password}`)
      .setValue('#signup-cpsw', `${adminUser1.password}`)
      .setValue('#signup-city', `${adminUser1.city}`)
      .setValue('#signup-state', `${adminUser1.state}`)
      .waitForElementVisible('#signup > p:nth-child(11) > button', 5000)
      .moveToElement('#signup > p:nth-child(11) > button', 10, 10)
      .pause(5000)
      .submitForm('#root > div > div:nth-child(1) > section > div > div > form')
      .pause(2000)
      .assert.containsText('.login-form-title', 'USER LOGIN')
      .pause(2000)
      .end();
  },
  'It should not show email error if email input is incorrect': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(2)')
      .waitForElementVisible('.signuppage', 1000)
      .setValue('#signup-email', 'john.com') // wrong email format
      .setValue('#signup-role', 'Caterer')
      .pause(2000)
      .assert.containsText('#signup > p:nth-child(3) > span', 'email is invalid')
      .pause(2000)
      .end();
  },
  'It should not show password error if password and confirm password are not the same is': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(2)')
      .waitForElementVisible('.signuppage', 1000)
      .execute('window.scrollTo(0,document.body.scrollHeight)')
      .setValue('#signup-psw', `${adminUser1.password}`)
      .setValue('#signup-cpsw', '12345')
      .pause(2000)
      .assert.containsText('#signup > p:nth-child(9) > span', 'password do not match!')
      .assert.containsText('#signup > p:nth-child(10) > span', 'password do not match!')
      .pause(2000)
      .end();
  }
};
