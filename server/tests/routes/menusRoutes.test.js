import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';

import app from '../../app';
import db from '../../../models';

import {
  catererMariaMenu,
  catererDejiMenu,
  menusDatas,
  catererMariaMenuMeals,
  catererDejiMenuMeals,
  caterermariaMeals,
  catererdejiMeals
} from '../../helpers/test-data/menus';
import getToken from '../../helpers/getToken';
import users from '../../helpers/test-data/users';

const {
  catererMaria,
  catererDeji,
  customerRose,
} = users;

chai.use(chaiHttp);

describe('Menus API routes', () => {


  // token details
  const catererMariaTokenDetails = {
    id: catererMaria.id,
    admin: catererMaria.admin
  };

  const catererDejiTokenDetails = {
    id: catererDeji.id,
    admin: catererDeji.admin
  };

  const customerRoseTokenDetails = {
    id: customerRose.id,
    admin: customerRose.admin
  };

  // get tokens
  const catererMariaToken = getToken(catererMariaTokenDetails);
  const catererDejiToken = getToken(catererDejiTokenDetails);
  const customerRoseToken = getToken(customerRoseTokenDetails);

  before(async () => {
    await db.User.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true }});
    await db.Menu.truncate();
    await db.MenuMeal.truncate();

    await db.User.create(catererMaria);
    await db.User.create(catererDeji);
    await db.User.create(customerRose)

    await caterermariaMeals.map(meal => db.Meal.create(meal))
    await catererdejiMeals.map(meal => db.Meal.create(meal))
  });

  describe('POST /api/v1/menus', () => {
    it('should allow caterer create menu for the day', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send(catererMariaMenu)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message', 'menu');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow caterer create menu on the same date more than once', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        ...catererMariaMenu,
        postOn: '2020-05-18',
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(409);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`Menu for date: ${catererMariaMenu.postOn} have already been posted!`);
        done();
      });
    });

    it('should return error if the `postOn` date is in incorrect format', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        ...catererMariaMenu,
        postOn: '18-05-2020',
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('18-05-2020 is invalid or in wrong format.');
        done();
      });
    });

    it('should not allow menu to be created on past dates', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        ...catererMariaMenu,
        postOn: '2009-05-18',
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`you can't post menu on this date: 2009-05-18 anymore!`);
        done();
      });
    });

    it('should allow caterer create menu for future dates', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send(catererDejiMenu)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message', 'menu');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow a caterer post another caterer\'s meal', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        ...catererDejiMenu,
        postOn: "2020-09-09"
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${catererDejiMenu.meals}, not found!`);
        done();
      });
    });

    it('should not allow customers caterer menu', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send(catererDejiMenu)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if meals field is empty', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        postOn: '2020-08-20',
        meals: []
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('meals field is empty!');
        done();
      });
    });

    it('should return error if `postOn` field is empty', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        ...catererMariaMenu,
        postOn: '',
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('postOn field is empty!');
        done();
      });
    });
  });

  describe('POST /api/v1/menus/:menuId/meals', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    })

    it('should allow caterer add meals to existing menu', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({ meals: catererDejiMenu.meals}) // catererDejiTokenDetails adds his meals to catererMariaTokenDetails's menu
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meals added to menu successfully!');
        done();
      });
    });

    it('should not allow customers add meals to menu', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send({ meals: catererDejiMenu.meals})
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should throw error if trying to add to menu created on past dates', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[1].id}/meals`) // expired menu id
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({ meals: catererMariaMenu.meals}) // catererMariaTokenDetails adds his meals to expired menu
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Can\'t modify menu anymore!');
        done();
      });
    });

    it('should throw error if menu is not found', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus/25cf8240-2eec-40dd-9678-1b6f722561d3/meals') // non-existing menu
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({ meals: catererDejiMenu.meals})
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Menu not found!');
        done();
      });
    });

    it('should throw error if a caterer is trying to add another caterer\'s meal to a menu', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[1].id}/meals`)
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({ meals: catererMariaMenu.meals}) // catererDeji trying to add catererMaria's meals to the menu
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${catererMariaMenu.meals}, not found!`);
        done();
      });
    });

    it('should throw error if menu id is wrong', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus/dhkSLSHksd/meals') // wrong params
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({ meals: catererDejiMenu.meals}) // catererDeji trying to add catererMaria's meals to the menu
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('menuId is incorrect!');
        done();
      });
    });
  });

  describe('GET /api/v1/menus/today', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    })

    it('should get menu for the present day', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/today')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .end((error, res) => {
        const { success, message, pagination, menu } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(success).to.equal(true);
        expect(message).to.equal('Menu retrieved successfully!');
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(3);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        expect(menu).to.be.an('array');
        expect(menu[0]).to.have.all.keys('id', 'UserId', 'postOn', 'createdAt', 'User', 'Meals', 'updatedAt');
        expect(menu[0].UserId).to.equal(catererMaria.id);
        expect(menu[0].id).to.equal(menusDatas[0].id);
        expect(menu[0].User.firstName).to.equal(catererMaria.firstName);
        expect(menu[0].User.lastName).to.equal(catererMaria.lastName);
        expect(menu[0].postOn).to.equal(moment().format('YYYY-MM-DD'));
        expect(menu[0].Meals.length).to.equal(3);
        done();
      });
    });

    it('should allow customers get menu for present day', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/today?limit=4')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        const { success, message, pagination, menu } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(success).to.equal(true);
        expect(message).to.equal('Menu retrieved successfully!');
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(4);
        expect(pagination.count).to.equal(3);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(4);
        expect(menu).to.be.an('array');
        expect(menu[0]).to.have.all.keys('id', 'postOn', 'UserId', 'createdAt', 'User', 'Meals', 'updatedAt');
        expect(menu[0].UserId).to.equal(catererMaria.id);
        expect(menu[0].id).to.equal(menusDatas[0].id);
        expect(menu[0].User.firstName).to.equal(catererMaria.firstName);
        expect(menu[0].User.lastName).to.equal(catererMaria.lastName);
        expect(menu[0].postOn).to.equal(moment().format('YYYY-MM-DD'));
        expect(menu[0].Meals.length).to.equal(3);
        done();
      });
    });
  });

  describe('GET /api/v1/menus', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    });

    it('should allow caterer get all menus', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .end((error, res) => {
        const { pagination, message, success, menus } = res.body;
        if (error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'menus');
        expect(success).to.equal(true);
        expect(message).to.equal('Menus retrieved successfully');
        expect(menus).be.an('array');
        expect(menus.length).to.be.at.most(10);
        expect(menus.length).to.equal(2);
        expect(menus.length).to.be.at.least(1);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(2);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        menus.forEach(menu => {
          menu.should.be.an('object');
          expect(menu).to.have.all.keys('id', 'postOn', 'UserId', 'User', 'Meals', 'createdAt', 'updatedAt');
          expect(menu.Meals).to.be.a('string');
          expect(menu.Meals).to.equal(`/api/v1/menus/${menu.id}/meals`)
        });
        done();
      });
    });

    it('should not allow customer get all menus', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/menus/:mealId/meals', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    });

    it('should allow caterer get a menu\'s meals', (done) => {
      chai.request(app.listen())
      .get(`/api/v1/menus/${menusDatas[1].id}/meals?limit=2`)
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .end((error, res) => {
        const { pagination, message, success, menu } = res.body;
        if (error) return done(error);
        expect(res.status).to.equal(200);
        expect(success).to.equal(true);
        expect(message).to.equal('Menu retrieved successfully!');
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(2);
        expect(pagination.count).to.equal(4);
        expect(pagination.numOfPages).to.equal(2);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(2);
        expect(menu).to.be.an('array');
        expect(menu[0]).to.have.all.keys('id', 'postOn', 'UserId', 'createdAt', 'User', 'Meals', 'updatedAt');
        expect(menu[0].UserId).to.equal(catererDeji.id);
        expect(menu[0].id).to.equal(menusDatas[1].id);
        expect(menu[0].User.firstName).to.equal(catererDeji.firstName);
        expect(menu[0].User.lastName).to.equal(catererDeji.lastName);
        expect(menu[0].postOn).to.equal(menusDatas[1].postOn);
        expect(menu[0].Meals.length).to.equal(2);
        done();
      });
    });

    it('should return error if caterer meals is not in the menu', (done) => {
      chai.request(app.listen())
      .get(`/api/v1/menus/${menusDatas[1].id}/meals?limit=2`)
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .end((error, res) => {
        const { message, success } = res.body;
        if (error) return done(error);
        expect(res.status).to.equal(404);
        expect(success).to.equal(false);
        expect(message).to.equal('Your meals are not in this menu');
        done();
      });
    });

    it('should not allow customer get a menu\'s meals', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });


  describe('DELETE /api/v1/menus', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    });

    it('should not allow customer delete meals from a menu', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send({
        meals: [catererMariaMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if meal id is incorrect', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/menus/frdtuyt56778/meals') // wrong params
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        meals: [catererMariaMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('menuId is incorrect!');
        done();
      });
    });

    it('should return error if menu is not found', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/menus/df8449dc-1e13-4084-a32a-6f476261831a/meals') // non existing menu
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        meals: [catererMariaMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Menu not found!');
        done();
      });
    });

    it('should return error if meal do not belong to the caterer making the request', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({
        meals: [catererMariaMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${catererMariaMenu.meals[0]}, not found!`);
        done();
      });
    });

    it('should not delete meals in a menu that has expired', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[1].id}/meals`) // expired menu
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send({
        meals: [catererDejiMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Can\'t modify menu anymore!');
        done();
      });
    });

    it('should allow caterer delete meals from a menu', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send({
        meals: [catererMariaMenu.meals[0]]
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meal removed from menu successfully!');
        done();
      });
    });
  });

  after(async () => {
    await db.Menu.truncate();
    await db.MenuMeal.truncate();
    await db.User.truncate();
    await db.Meal.destroy({ force: true, truncate: { cascade: true }});
  })
});

