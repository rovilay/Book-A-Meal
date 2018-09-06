import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';
import dotenv from 'dotenv'

import app from '../../app';
import db from '../../../models';
import getToken from '../../helpers/getToken';
import users from '../../helpers/test-data/users';

dotenv.config();

import {
  caterermariaMeals,
  catererdejiMeals,
  customerRoseOrder,
  customerRoviOrder,
  menusDatas,
  catererMariaMenuMeals,
  catererDejiMenuMeals,
  ordersData,
  orderMeals,
  customerRoseOrderUpdate
} from '../../helpers/test-data/orders';

chai.use(chaiHttp);

const {
  catererDeji,
  catererMaria,
  customerRose,
  customerRovi
} = users;

describe('Orders API routes', () => {

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

  const customerRoviTokenDetails = {
    id: customerRovi.id,
    admin: customerRovi.admin
  };

  // get tokens
  const catererMariaToken = getToken(catererMariaTokenDetails);
  const catererDejiToken = getToken(catererDejiTokenDetails);
  const customerRoseToken = getToken(customerRoseTokenDetails);
  const customerRoviToken = getToken(customerRoviTokenDetails);

  before(async () => {
    await db.User.truncate();
    await db.Meal.destroy({ truncate: { cascade: true } });
    await db.Menu.truncate();
    await db.MenuMeal.truncate();
    await db.Order.truncate();
    await db.OrderMeal.truncate();

    await db.User.create(catererMaria);
    await db.User.create(catererDeji);
    await db.User.create(customerRose);
    await db.User.create(customerRovi);
    await caterermariaMeals.map(meal => db.Meal.create(meal))
    await catererdejiMeals.map(meal => db.Meal.create(meal))
    await db.Menu.bulkCreate(menusDatas);
    await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
    await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
  });

  beforeEach(async () => {
    await db.Order.truncate();
    await db.OrderMeal.truncate();

    await db.Order.bulkCreate(ordersData);
    await db.OrderMeal.bulkCreate(orderMeals);
  })

  describe('POST /api/v1/orders', () => {
    it('should allow customer place order', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send(customerRoseOrder)
      .end((error, res) => {
        if(error) return done(error);
        // check if it's opening hours or not
        if(moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Order placed successfully!');
        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
        }

        done();
      });
    });

    it('should not allow caterer place orders', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .send(customerRoseOrder)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not place orders if meals input is incorrect', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send({
          deliveryAddress: 'maryland Lagos',
          meals: [
            {
              id: '',
              portion: 2,
              price: 300
            }
          ]
      })
      .end((error, res) => {
        if(error) return done(error);

        if(moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('meal entry is not correct');

        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
        }
        done();
      });
    });

    it('should not place orders if `deliveryAddress` field is empty', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send({
          ...customerRoseOrder,
          deliveryAddress: '',
      })
      .end((error, res) => {
        if(error) return done(error);

        if(moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('deliveryAddress field is empty!');

        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
        }
        done();
      });
    });

    it('should throw error if trying to order meal not created', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .send({
          deliveryAddress: 'maryland Lagos',
          meals: [
            {
              id: '32947007-da1b-4bc1-ad3a-8cc106dee9fb', // non existing meal
              portion: 2,
              unitPrice: 200
            }
          ]
      })
      .end((error, res) => {
        if(error) return done(error);
        if(moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('meals 32947007-da1b-4bc1-ad3a-8cc106dee9fb, not found!');
        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
        }

        done();
      });
    });
  });

  describe('GET /api/v1/orders', () => {
    before(async () => {
      await db.Menu.truncate();
      await db.MenuMeal.truncate();

      await db.Menu.bulkCreate(menusDatas);
      await db.MenuMeal.bulkCreate(catererMariaMenuMeals);
      await db.MenuMeal.bulkCreate(catererDejiMenuMeals);
    });

    it('should return error if offset is a negative integer', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders?limit=2&offset=-1')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .end((error, res) => {
        const { message, success } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Offset query must be a number and not be less than 0!');
        done();
      });
    });

    it('should return error if order is not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders?limit=2&offset=0')
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .end((error, res) => {
        const { message, success } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('No order found!');
        done();
      });
    });

    it('should return all orders that have the caterer\'s meals in them', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .end((error, res) => {
        const { pagination, message, success, orders } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'orders', 'grandTotalPrice');
        expect(success).to.equal(true);
        expect(message).to.equal('Orders retrieved successfully!');
        expect(orders).be.an('array');
        expect(orders.length).to.equal(2);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(2);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        orders.forEach(order => {
          order.should.be.an('object');
          expect(order).to.have.all.keys('id', 'deliveryAddress', 'UserId', 'User', 'totalPrice', 'Meals', 'createdAt', 'updatedAt');
          expect(order.Meals).to.be.a('string');
          expect(order.Meals).to.equal(`/api/v1/orders/${order.id}/meals`)
        });
        done();
      });
    });

    it('should allow customers get all orders', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .end((error, res) => {
        const { pagination, message, success, orders } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'orders', 'grandTotalPrice');
        expect(success).to.equal(true);
        expect(message).to.equal('Orders retrieved successfully!');
        expect(orders).be.an('array');
        expect(orders.length).to.equal(1);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(1);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        orders.forEach(order => {
          order.should.be.an('object');
          expect(order).to.have.all.keys('id', 'deliveryAddress', 'UserId', 'User', 'totalPrice', 'Meals', 'createdAt', 'updatedAt');
          expect(order.Meals).to.be.a('string');
          expect(order.Meals).to.equal(`/api/v1/orders/${order.id}/meals`)
        });
        done();
      });
    });
  });

  describe('GET /api/v1/orders/:orderId/meals', () => {
    it('should return meals of order', (done) => {
      chai.request(app.listen())
      .get(`/api/v1/orders/${ordersData[0].id}/meals`)
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        const { pagination, message, success, order } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'order', 'grandTotalPrice');
        expect(success).to.equal(true);
        expect(message).to.equal('Order retrieved successfully!');
        expect(order).be.an('array');
        expect(order.length).to.equal(1);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(3);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        expect(order).to.be.an('array');
        expect(order[0]).to.have.all.keys('id', 'UserId', 'deliveryAddress', 'totalPrice', 'User', 'Meals', 'createdAt', 'updatedAt');
        expect(order[0].UserId).to.equal(customerRose.id);
        expect(order[0].id).to.equal(ordersData[0].id);
        expect(order[0].User.firstName).to.equal(customerRose.firstName);
        expect(order[0].User.lastName).to.equal(customerRose.lastName);
        expect(order[0].deliveryAddress).to.equal(ordersData[0].deliveryAddress);
        expect(order[0].Meals.length).to.equal(3);
        done();
      });
    });

    it('should return `not found` if order is not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders/7a5d6838-569b-4fb5-955c-356ad7089645/meals')
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .end((error, res) => {
        const { success, message } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Order not found!');
        done();
      });
    });
  });

  describe('PUT /api/v1/orders/:orderId', () => {
    it('should allow customer update his/her order', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send(customerRoseOrderUpdate)
      .end((error, res) => {
        const { success, message } = res.body;
        if(error) return done(error);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'updatedOrder');
        expect(success).to.equal(true);
        expect(message).to.equal('Update successful!');

        done();
      });
    });

    it('should not allow caterer update orders', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${catererMariaToken}`)
      .send(customerRoviOrder)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not allow customer update another customer\'s orders', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .send(customerRoseOrderUpdate)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Order not found!');

        done();
      });
    });

    it('should not update order if meals field is empty', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .send({
          deliveryAddress: 'maryland Lagos',
          meals: []
      })
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('meals field is empty!');

        done();
      });
    });
  });

  describe('DELETE /api/v1/orders/:id', (done) => {
    it('should allow customer cancel his/her order', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(204);

        done();
      });
    });

    it('should not allow customer cancel another customer\'s orders', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customerRoviToken}`)
      .send(customerRoviOrder)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Order not found!');

        done();
      });
    });

    it('should not allow caterer delete order', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${catererDejiToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });
  });
});
