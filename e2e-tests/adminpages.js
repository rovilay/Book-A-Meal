import 'babel-polyfill';
import moment from 'moment';
import db from '../models';
import userData from '../server/helpers/test-data/users';
import {
  menusDatas,
  catererMariaMenuMeals,
  catererDejiMenuMeals,
  caterermariaMeals,
  catererdejiMeals
} from '../server/helpers/test-data/menus';
import {
  ordersData,
  orderMeals,
  catererRoseMeals
} from '../server/helpers/test-data/orders';

const {
  catererMaria,
  catererDeji,
  customerRose,
} = userData;

const tomorrow = moment().add(1, 'days').format('DD');

module.exports = {
  before: async () => {
    await db.OrderMeal.truncate();
    await db.Order.truncate();
    await db.MenuMeal.truncate();
    await db.Menu.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true } });
    await db.User.truncate();

    await db.User.create(catererMaria);
    await db.User.create(catererDeji);
    await db.User.create(customerRose);

    await caterermariaMeals.map(meal => db.Meal.create(meal));
    await catererdejiMeals.map(meal => db.Meal.create(meal));

    await db.Menu.bulkCreate(menusDatas);
    await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
    await db.MenuMeal.bulkCreate(catererDejiMenuMeals);

    await db.Meal.bulkCreate(catererRoseMeals);
    await db.Order.bulkCreate(ordersData);
    await db.OrderMeal.bulkCreate(orderMeals);
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
  'It should login admin`': (browser) => {
    browser
      .url('http://localhost:9000')
      .waitForElementVisible('body', 1000)
      .click('#nav-menu > a:nth-child(1)')
      .waitForElementVisible('.loginpage', 1000)
      .setValue('#login-email', `${catererMaria.email}`)
      .setValue('#login-password', `${catererMaria.password}`)
      .waitForElementVisible('.loginbtn', 1000)
      .pause(2000)
      .click('.loginbtn')
      .pause(1000);
  },
  'It should show menus list on admin dashboard': (browser) => {
    browser
      .assert.containsText('.merienda', 'Welcome Maria Akinola')
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .assert.containsText('#root > div > div:nth-child(1) > div > div > section.adminpage > div.menu-title', 'MENUS LIST');
  },
  'It should show menu details when menu item is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1)') // menu 1 on  menu list
      .pause(1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1) > div.accordion__body > div > div > div.menu-details > p:nth-child(2) > span:nth-child(2)', 'Maria Akinola')
      .pause(1000)
      .execute('window.scrollTo(0,document.body.scrollHeight)')
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1) > div.accordion__body > div > div > div.menu-meals > button'); // show meals button
  },
  'It should show `Add meals` modal  if `Add meals` button is clicked': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1) > div.accordion__body > div > div > div.menu-meals > div.meal-hide-add-btns.hide-mobile > button.responsive-btn-2.add-meals-btn') // add meals button
      .pause(2000)
      .assert.containsText('body > div.ReactModalPortal > div > div > div.table-container > h2', 'ADD MEALS');
  },
  'It should add selected meal to menu if confirmed': (browser) => {
    browser
      .pause(2000)
      .click('#ad2fb525-6771-4feb-9b54-a0ad6b8c2813-edit') // select meal 1
      .pause(1000)
      .click('#ee2f5319-07d9-43b9-a15e-0e5d9215da1c-edit') // select meal 2
      .pause(2000)
      .submitForm('body > div.ReactModalPortal > div > div > div.table-container > form') // submit add meal form
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button') // confirm update
      .pause(1000)
      .assert.containsText('#root > div > div:nth-child(1) > div > div > section.adminpage > div.menu-title', 'MENUS LIST');
  },
  'It should delete meal from menu if `delete` button is clicked': (browser) => {
    browser
      .pause(2000)
      .execute('window.scrollTo(0, document.body.scrollHeight)')
      .pause(2000)
      .click('#ee2f5319-07d9-43b9-a15e-0e5d9215da1c > button') // delete meal button
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(1) > button')
      .pause(2000)
      .click('#df8449dc-1e13-4084-a32a-6f476261831a > button') // delete meal button
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button')
      .pause(1000)
      .click('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1) > div.accordion__body > div > div > div.menu-meals > div.meal-hide-add-btns.hide-mobile > button.responsive-btn-2.hide-meals-btn') // hide meals button
      .pause(1000)
      .click('#root > div > div:nth-child(1) > div > div > section.adminpage > div.container > div.accordion > div > div:nth-child(1) > div.accordion__title.myaccordiontitle-b39f320e-f777-4554-a64c-579844cc2b2c'); // close menu body
  },
  'It should create new menu': (browser) => {
    browser
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > section.setmenu > div > div > div') // open create menu form
      .pause(2000)
      .execute('window.scrollTo(0, 200)')
      .pause(1000)
      .setValue('#accordion__body-0 > div > form > div.date > p > input[type="date"]', `${tomorrow}`) // add date
      .click('#checkbox-bef1feb2-a5d0-4c13-928d-9dd011aa714b') // select meal 1
      .pause(1000)
      .click('#checkbox-7b7ba1e6-9790-4be5-9b7d-334b308da5bc') // select meal 2
      .pause(1000)
      .click('#checkbox-ee2f5319-07d9-43b9-a15e-0e5d9215da1c') // select meal 3
      .pause(2000)
      .execute('window.scrollTo(0, 250)')
      .pause(2000)
      .submitForm('#accordion__body-0 > div > form');
  },
  'It should navigate to meal page': (browser) => {
    browser
      .pause(2000)
      .click('#nav-menu > a:nth-child(2)')
      .pause(2000)
      .assert.containsText('.merienda', 'Manage Meals');
  },
  'It should not add meal if meal already exist': (browser) => {
    browser
      .pause(2000)
      .execute('window.scrollTo(0,300)')
      .pause(2000)
      .click('#root > div > div:nth-child(1) > div > div > section > div > div > div > div.accordion__title')
      .pause(1000)
      .setValue('#meal-form > div.name > p > input[type="text"]', 'CAKE')
      .setValue('#meal-form > div.price > p > input[type="number"]', '500')
      .setValue('#meal-form > div.dsc > p > input[type="text"]', 'So sweet')
      .pause(2000)
      .submitForm('#meal-form')
      .pause(1000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button');
  },
  'It should add new meal if meal': (browser) => {
    browser
      .pause(1000)
      .setValue('#meal-form > div.name > p > input[type="text"]', ' AND CHOCOLATE')
      .pause(2000)
      .submitForm('#meal-form')
      .pause(2000)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button');
  },
  'It should navigate to order page': (browser) => {
    browser
      .pause(2000)
      .click('#nav-menu > a:nth-child(3)')
      .pause(2000)
      .assert.containsText('.merienda', 'Order History');
  },
  'It should order info when info button is clicked': (browser) => {
    browser
      .pause(1000)
      .click('#root > div > div:nth-child(1) > div > div > div.container-test > div:nth-child(2) > p.row-item.actions > button')
      .pause(2000)
      .assert.containsText('body > div.ReactModalPortal > div > div > div.table-container > div.order-details > h2', 'ORDER DETAILS')
      .assert.containsText('body > div.ReactModalPortal > div > div > div.table-container > div.order-details > p:nth-child(3) > span', 'Customer:')
      .pause(1000)
      .click('#nav-menu > a:nth-child(4)')
      .pause(2000)
      .end();
  }
};
