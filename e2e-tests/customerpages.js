import 'babel-polyfill';
import db from '../models';
import userData from '../server/helpers/test-data/users';
import {
  menusDatas,
  admin3MenuMeals,
  admin4MenuMeals,
  meals1,
  meals2
} from '../server/helpers/test-data/menus';

const {
  adminUser3,
  adminUser4,
  customerUser1,
} = userData;

module.exports = {
  before: async () => {
    await db.OrderMeal.truncate();
    await db.Order.truncate();
    await db.MenuMeal.truncate();
    await db.Menu.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true } });
    await db.User.truncate();

    await db.User.create(adminUser3);
    await db.User.create(adminUser4);
    await db.User.create(customerUser1);

    await meals1.map(meal => db.Meal.create(meal));
    await meals2.map(meal => db.Meal.create(meal));

    await db.Menu.bulkCreate(menusDatas);
    await db.MenuMeal.bulkCreate(admin3MenuMeals);
    await db.MenuMeal.bulkCreate(admin4MenuMeals);
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
  'It should login customer`': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(1)')
      .waitForElementVisible('.loginpage', 1000)
      .setValue('#login-email', `${customerUser1.email}`)
      .setValue('#login-password', `${customerUser1.password}`)
      .waitForElementVisible('.loginbtn', 1000)
      .pause(2000)
      .click('.loginbtn')
      .pause(1000);
  },
  'It should show today\'s menu on customer dashboard': (browser) => {
    browser
      .assert.containsText('.merienda', `Welcome, ${customerUser1.firstName} ${customerUser1.lastName}`)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .assert.containsText('#menu > div.title', 'TODAY\'S MENU')
      .execute('window.scrollTo(0,document.body.scrollHeight)');
  },
  'It should add meal to cart if meal\'s add button is clicked': (browser) => {
    browser
      .pause(3000)
      .click('#menu > div.menu-container > div:nth-child(1) > div.meal-label > button')
      .pause(2000);
  },
  'It should navigate to cartpage and place order': (browser) => {
    browser
      .click('#nav-menu > a:nth-child(2)')
      .waitForElementVisible('.cartpage', 1000)
      .assert.containsText('.merienda', 'Your Cart')
      .pause(1000)
      .setValue('#portion-3e97f7da-f460-408a-a4b0-15f9ecc41cca', 3)
      .setValue('#cart-address', 'amity')
      .pause(2000)
      .submitForm('form')
      .pause(2000)
      .assert.containsText('.merienda', `Welcome, ${customerUser1.firstName} ${customerUser1.lastName}`);
  },
  'It should not remove meal from cart if delete is clicked but not confirmed': (browser) => {
    browser
      .execute('window.scrollTo(0,document.body.scrollHeight)')
      .pause(3000)
      .click('#menu > div.menu-container > div:nth-child(1) > div.meal-label > button')
      .pause(2000)
      .click('#nav-menu > a:nth-child(2)')
      .waitForElementVisible('.cartpage', 1000)
      .click('#root > div > div:nth-child(1) > div > section > form > div.container-test > div:nth-child(2) > p.row-item.actions > button')
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(1) > button');
  },
  'It should remove meal from cart if delete is clicked and confirmed': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > section > form > div.container-test > div:nth-child(2) > p.row-item.actions > button')
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button')
      .pause(2000)
      .assert.containsText('.merienda', `Welcome, ${customerUser1.firstName} ${customerUser1.lastName}`);
  },
  'It should navigate to orderpage and show order details when order info button is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#nav-menu > a:nth-child(3)')
      .pause(1000)
      .assert.containsText('.merienda', 'Your Order History')
      .click('#root > div > div:nth-child(1) > div > section > div.container-test > div:nth-child(2) > p.row-item.actions > button:nth-child(1)')
      .pause(2000)
      .assert.containsText('body > div.ReactModalPortal > div > div > div.modal-container > div.order-details > h2', 'ORDER DETAILS')
      .pause(1000)
      .click('body > div.ReactModalPortal > div > div > div.closeBtn > button');
  },
  'It should show edit order modal and update order when order edit button is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > section > div.container-test > div:nth-child(2) > p.row-item.actions > button:nth-child(2)')
      .pause(1000)
      .setValue('#portion-3e97f7da-f460-408a-a4b0-15f9ecc41cca', 3)
      .setValue('#delivery-address', 'Epic Tower')
      .pause(3000)
      .click('body > div.ReactModalPortal > div > div > div.modal-container > form > div.order > button');
  },
  'It should cancel order if delete order button is clicked and confirmed': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > section > div.container-test > div:nth-child(2) > p.row-item.actions > button:nth-child(3)')
      .pause(1000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button')
      .pause(1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > section > p', 'No orders found!')
      .click('#nav-menu > a:nth-child(4)')
      .pause(2000)
      .end();
  }
};
