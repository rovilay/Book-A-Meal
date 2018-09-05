import 'babel-polyfill';
import db from '../models';
import {
  menusDatas,
  catererMariaMenuMeals,
  catererDejiMenuMeals,
  caterermariaMeals,
  catererdejiMeals
} from '../server/helpers/test-data/menus';

module.exports = {
  before: async () => {
    await db.OrderMeal.truncate();
    await db.Order.truncate();
    await db.MenuMeal.truncate();
    await db.Menu.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true } });
    await db.User.truncate();

    await caterermariaMeals.map(meal => db.Meal.create(meal));
    await catererdejiMeals.map(meal => db.Meal.create(meal));

    await db.Menu.bulkCreate(menusDatas);
    await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
    await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
  },
  after: async () => {
    await db.OrderMeal.truncate();
    await db.Order.truncate();
    await db.MenuMeal.truncate();
    await db.Menu.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true } });
    await db.User.truncate();
  },
  beforeEach: (browser) => {
    browser.maximizeWindow();
  },
  'It should scroll to menu if `view menu` button is clicked': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > main > section.first-section > div > p', 'Meals that perfectly fits your lifestyle')
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > main > section.first-section > div > a');
  },
  'It should navigate to login page if meal is added to cart': (browser) => {
    browser
      .pause(2000)
      .click('#menu > div.menu-container > div:nth-child(1) > div.meal-label > button')
      .pause(1000)
      .waitForElementVisible('.loginpage', 1000);
  },
  'It should navigate back to homepage if logo is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > header > a.logo.active')
      .waitForElementVisible('body', 1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > main > section.first-section > div > p', 'Meals that perfectly fits your lifestyle')
      .pause(2000)
      .end();
  },
};
