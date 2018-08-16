import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';

import app from '../../app';
import db from '../../../models';

import {
  admin3Menu,
  admin4Menu,
  menusDatas,
  admin3MenuMeals,
  admin4MenuMeals,
  meals1,
  meals2
} from '../../helpers/test-data/menus';
import getToken from '../../helpers/gettokens';
import userData from '../../helpers/test-data/users';

const {
  adminUser3,
  adminUser4,
  customerUser1,
} = userData;

chai.use(chaiHttp);

describe('Menus API routes', () => {


  // token details
  const admin3 = {
    id: adminUser3.id,
    admin: adminUser3.admin
  };

  const admin4 = {
    id: adminUser4.id,
    admin: adminUser4.admin
  };

  const customer = {
    id: customerUser1.id,
    admin: customerUser1.admin
  };

  // get tokens
  const admin3Token = getToken(admin3);
  const admin4Token = getToken(admin4);
  const customerToken = getToken(customer);

  before(async () => {
    await db.User.truncate();
    await db.Meal.truncate();
    await db.Menu.truncate();
    await db.MenuMeal.truncate();

    await db.User.create(adminUser3);
    await db.User.create(adminUser4);
    await db.User.create(customerUser1)

    await meals1.map(meal => db.Meal.create(meal))
    await meals2.map(meal => db.Meal.create(meal))
  });

  describe('POST /api/v1/menus', () => {
    it('should post menu for the day only if admin', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send(admin3Menu)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message', 'menu');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow admin post menu on the same date more than once', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        ...admin3Menu,
        postOn: '2020-05-18',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`Menu for date: ${admin3Menu.postOn} have already been posted!`);
        done();
      });
    });

    it('should return error if poston date is in incorrect format', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        ...admin3Menu,
        postOn: '18-05-2020',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('18-05-2020 is invalid or in wrong format.');
        done();
      });
    });

    it('should not allow posting menu on past dates', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        ...admin3Menu,
        postOn: '2009-05-18',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`you can't post menu on this date: 2009-05-18 anymore!`);
        done();
      });
    });

    it('should allow admin post menu for another day', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin4Token}`)
      .send(admin4Menu)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message', 'menu');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow admin post another admin\'s meal', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        ...admin4Menu,
        postOn: "2020-09-09"
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${admin4Menu.meals}, not found!`);
        done();
      });
    });

    it('should not allow customers post menu', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(admin4Menu)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if input not correct', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        postOn: '2020-08-20',
        meals: []
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('meals field is empty!');
        done();
      });
    });

    it('should return error if input not correct', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        ...admin3Menu,
        postOn: '',
      })
      .end((err, res) => {
        if(err) return done(err);
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    })

    it('should allow admin add menu to existing meals', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({ meals: admin4Menu.meals}) // admin4 adds his meals to admin3's menu
      .end((err, res) => {
        if(err) return done(err);
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
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ meals: admin4Menu.meals})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should throw error if trying to add to expired menu', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[1].id}/meals`) // expired menu id
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({ meals: admin3Menu.meals}) // admin3 adds his meals to expired menu
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(405);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Can\'t modify menu anymore!');
        done();
      });
    });

    it('should throw error if menu not found', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus/25cf8240-2eec-40dd-9678-1b6f722561d3/meals') // non-existing menu
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({ meals: admin4Menu.meals})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Menu not found!');
        done();
      });
    });

    it('should throw error if trying to add meals not created by the admin making request', (done) => {
      chai.request(app.listen())
      .post(`/api/v1/menus/${menusDatas[1].id}/meals`)
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({ meals: admin3Menu.meals}) // admin4 trying to add admin3's meals to the menu
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${admin3Menu.meals}, not found!`);
        done();
      });
    });

    it('should throw error if menu id is wrong', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus/dhkSLSHksd/meals') // wrong params
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({ meals: admin4Menu.meals}) // admin4 trying to add admin3's meals to the menu
      .end((err, res) => {
        if(err) return done(err);
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    })

    it('should get menus for the present day', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/today')
      .set('Authorization', `Bearer ${admin3Token}`)
      .end((err, res) => {
        const { success, message, pagination, menu } = res.body;
        if(err) return done(err);
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
        expect(menu[0].UserId).to.equal(adminUser3.id);
        expect(menu[0].id).to.equal(menusDatas[0].id);
        expect(menu[0].User.firstName).to.equal(adminUser3.firstName);
        expect(menu[0].User.lastName).to.equal(adminUser3.lastName);
        expect(menu[0].postOn).to.equal(moment().format('YYYY-MM-DD'));
        expect(menu[0].Meals.length).to.equal(3);
        done();
      });
    });

    it('should allow customers', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/today?limit=4')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        const { success, message, pagination, menu } = res.body;
        if(err) return done(err);
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
        expect(menu[0].UserId).to.equal(adminUser3.id);
        expect(menu[0].id).to.equal(menusDatas[0].id);
        expect(menu[0].User.firstName).to.equal(adminUser3.firstName);
        expect(menu[0].User.lastName).to.equal(adminUser3.lastName);
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    });

    it('should get all menus', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', `Bearer ${admin4Token}`)
      .end((err, res) => {
        const { pagination, message, success, menus } = res.body;
        if (err) return done(err);
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
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    });

    it('should get a menu\'s meals only if admin', (done) => {
      chai.request(app.listen())
      .get(`/api/v1/menus/${menusDatas[1].id}/meals?limit=2`)
      .set('Authorization', `Bearer ${admin4Token}`)
      .end((err, res) => {
        const { pagination, message, success, menu } = res.body;
        if (err) return done(err);
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
        expect(menu[0].UserId).to.equal(adminUser4.id);
        expect(menu[0].id).to.equal(menusDatas[1].id);
        expect(menu[0].User.firstName).to.equal(adminUser4.firstName);
        expect(menu[0].User.lastName).to.equal(adminUser4.lastName);
        expect(menu[0].postOn).to.equal(menusDatas[1].postOn);
        expect(menu[0].Meals.length).to.equal(2);
        done();
      });
    });

    it('should return error if admin meals not in menu', (done) => {
      chai.request(app.listen())
      .get(`/api/v1/menus/${menusDatas[1].id}/meals?limit=2`)
      .set('Authorization', `Bearer ${admin3Token}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(success).to.equal(false);
        expect(message).to.equal('Your meals are not in this menu');
        done();
      });
    });

    it('should not allow customer get menu meals', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    });

    it('should not delete meal if customer', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        meals: [admin3Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should not delete meal if meal id is incorrect', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/menus/frdtuyt56778/meals') // wrong params
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        meals: [admin3Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('menuId is incorrect!');
        done();
      });
    });

    it('should return error if menu not found', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/menus/df8449dc-1e13-4084-a32a-6f476261831a/meals') // non existing menu
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        meals: [admin3Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Menu not found!');
        done();
      });
    });

    it('should return error if meal do not belong to admin making the request', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({
        meals: [admin3Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal(`meals ${admin3Menu.meals[0]}, not found!`);
        done();
      });
    });

    it('should not delete meals in a menu has expired', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[1].id}/meals`) // expired menu
      .set('Authorization', `Bearer ${admin4Token}`)
      .send({
        meals: [admin4Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(405);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Can\'t modify menu anymore!');
        done();
      });
    });

    it('should delete meals in a menu only if admin and meal belongs to the admin', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/menus/${menusDatas[0].id}/meals`)
      .set('Authorization', `Bearer ${admin3Token}`)
      .send({
        meals: [admin3Menu.meals[0]]
      })
      .end((err, res) => {
        if(err) return done(err);
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
    await db.Meal.truncate();
  })
});

