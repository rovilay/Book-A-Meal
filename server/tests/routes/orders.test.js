import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';

import app from '../../app';
import db from '../../../models';
import getToken from '../../helpers/gettokens';
import userData from '../../helpers/test-data/users';

import {
  meals1,
  meals2,
  customer1Order,
  customer2Order,
  menusDatas,
  admin3MenuMeals,
  admin4MenuMeals,
  ordersData,
  orderMeals,
  customer2OrderUpdate,
  customer1OrderUpdate
} from '../../helpers/test-data/orders';

chai.use(chaiHttp);

const {
  adminUser4,
  adminUser3,
  customerUser1,
  customerUser2
} = userData;

describe('Orders API routes', () => {

  // token details
  const admin3 = {
    id: adminUser3.id,
    admin: adminUser3.admin
  };

  const admin4 = {
    id: adminUser4.id,
    admin: adminUser4.admin
  };

  const customer1 = {
    id: customerUser1.id,
    admin: customerUser1.admin
  };

  const customer2 = {
    id: customerUser2.id,
    admin: customerUser2.admin
  };

  // get tokens
  const admin3Token = getToken(admin3);
  const admin4Token = getToken(admin4);
  const customer1Token = getToken(customer1);
  const customer2Token = getToken(customer2);

  before(async () => {
    await db.User.truncate();
    await db.Meal.destroy({ truncate: true });
    await db.Menu.truncate();
    await db.MenuMeal.truncate();
    await db.Order.truncate();
    await db.OrderMeal.truncate();

    await db.User.create(adminUser3);
    await db.User.create(adminUser4);
    await db.User.create(customerUser1);
    await db.User.create(customerUser2);
    await meals1.map(meal => db.Meal.create(meal))
    await meals2.map(meal => db.Meal.create(meal))
    await db.Menu.bulkCreate(menusDatas);
    await db.MenuMeal.bulkCreate(admin3MenuMeals);
    await db.MenuMeal.bulkCreate(admin4MenuMeals);
  });

  beforeEach(async () => {
    await db.Order.truncate();
    await db.OrderMeal.truncate();

    await db.Order.bulkCreate(ordersData);
    await db.OrderMeal.bulkCreate(orderMeals);
  })

  describe('POST /api/v1/orders', () => {
    it('should place order if customer', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send(customer1Order)
      .end((err, res) => {
        if(err) return done(err);
        // check if it's opening hours or not
        if(moment().hour() >= 7 && moment().hour() <= 18) {
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

    it('should not allow admin place   orders', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${admin4Token}`)
      .send(customer1Order)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not place orders if input incomplete', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customer1Token}`)
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
      .end((err, res) => {
        if(err) return done(err);

        if(moment().hour() >= 7 && moment().hour() <= 18) {
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

    it('should not place orders if input incomplete', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({
          ...customer1Order,
          deliveryAddress: '',
      })
      .end((err, res) => {
        if(err) return done(err);

        if(moment().hour() >= 7 && moment().hour() <= 18) {
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

    it('should throw error if meal not found in db', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${customer2Token}`)
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
      .end((err, res) => {
        if(err) return done(err);
        if(moment().hour() >= 7 && moment().hour() <= 18) {
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
      await db.MenuMeal.bulkCreate(admin3MenuMeals);
      await db.MenuMeal.bulkCreate(admin4MenuMeals);
    });

    it('should return error if query is wrong', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders?limit=2&offset=-1')
      .set('Authorization', `Bearer ${admin3Token}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Offset query must be a number and not be less than 0!');
        done();
      });
    });

    it('should return error if order for the user is not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders?limit=2&offset=0')
      .set('Authorization', `Bearer ${admin4Token}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('No order found!');
        done();
      });
    });

    it('should return all orders that have the admin meals in them', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${admin3Token}`)
      .end((err, res) => {
        const { pagination, message, success, orders } = res.body;
        if(err) return done(err);
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
      .set('Authorization', `Bearer ${customer2Token}`)
      .end((err, res) => {
        const { pagination, message, success, orders } = res.body;
        if(err) return done(err);
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
      .set('Authorization', `Bearer ${customer1Token}`)
      .end((err, res) => {
        const { pagination, message, success, order } = res.body;
        if(err) return done(err);
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
        expect(order[0].UserId).to.equal(customerUser1.id);
        expect(order[0].id).to.equal(ordersData[0].id);
        expect(order[0].User.firstName).to.equal(customerUser1.firstName);
        expect(order[0].User.lastName).to.equal(customerUser1.lastName);
        expect(order[0].deliveryAddress).to.equal(ordersData[0].deliveryAddress);
        expect(order[0].Meals.length).to.equal(3);
        done();
      });
    });

    it('should return "not found" if order not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders/7a5d6838-569b-4fb5-955c-356ad7089645/meals')
      .set('Authorization', `Bearer ${customer2Token}`)
      .end((err, res) => {
        const { success, message } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Order not found!');
        done();
      });
    });
  });

  describe('PUT /api/v1/orders/:orderId', () => {
    it('should update order', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customer1Token}`)
      .send(customer1OrderUpdate)
      .end((err, res) => {
        const { success, message } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'updatedOrder');
        expect(success).to.equal(true);
        expect(message).to.equal('Update successful!');

        done();
      });
    });

    it('should not allow admin update orders', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${admin3Token}`)
      .send(customer2Order)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not allow user update another user\'s orders', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customer2Token}`)
      .send(customer1OrderUpdate)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Order not found!');

        done();
      });
    });

    it('should not update order if input incomplete', (done) => {
      chai.request(app.listen())
      .put(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customer2Token}`)
      .send({
          deliveryAddress: 'maryland Lagos',
          meals: []
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('meals field is empty!');

        done();
      });
    });
  });

  describe('DELETE /api/v1/orders/:id', (done) => {
    it('should delete order if customer', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customer1Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);

        done();
      });
    });

    it('should not allow user delete another user\'s orders', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${customer2Token}`)
      .send(customer2Order)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Order not found!');

        done();
      });
    });

    it('should not allow admin delete   order', (done) => {
      chai.request(app.listen())
      .delete(`/api/v1/orders/${ordersData[0].id}`)
      .set('Authorization', `Bearer ${admin4Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });
  });
});
