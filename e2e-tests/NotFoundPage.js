import 'babel-polyfill';

module.exports = {
  beforeEach: (browser) => {
    browser.maximizeWindow();
  },
  'It should redirect to `not found page` if route do not exist': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .pause(3000)
      .url('http://localhost:9000/non-existing-page')
      .pause(2000)
      .waitForElementVisible('.not-found-page', 1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > div > h1', '404!');
  },
  'It should redirect back home if `here` is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > a')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > main > section.first-section > div > p', 'Meals that perfectly fits your lifestyle')
      .pause(2000)
      .end();
  }
};
