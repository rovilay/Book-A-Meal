import 'babel-polyfill';
import db from '../models';
import userData from '../server/helpers/test-data/users';

const {
  catererJohn,
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
      .setValue('#signup-fname', `${catererJohn.firstName}`)
      .setValue('#signup-lname', `${catererJohn.lastName}`)
      .setValue('#signup-email', `${catererJohn.email}`)
      .setValue('#signup-role', 'Caterer')
      .setValue('#signup-phone', `${catererJohn.Phone}`)
      .setValue('#signup-address', `${catererJohn.address}`)
      .setValue('#signup-psw', `${catererJohn.password}`)
      .setValue('#signup-cpsw', `${catererJohn.password}`)
      .setValue('#signup-city', `${catererJohn.city}`)
      .setValue('#signup-state', `${catererJohn.state}`)
      .waitForElementVisible('#signup > p:nth-child(11) > button', 5000)
      .moveToElement('#signup > p:nth-child(11) > button', 10, 10)
      .pause(2000)
      .execute('window.scrollTo(0,document.body.scrollHeight)')
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
      .setValue('#signup-psw', `${catererJohn.password}`)
      .setValue('#signup-cpsw', '12345')
      .pause(2000)
      .assert.containsText('#signup > p:nth-child(9) > span', 'password do not match!')
      .assert.containsText('#signup > p:nth-child(10) > span', 'password do not match!')
      .pause(2000)
      .end();
  }
};
