import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from 'moment';

import app from '../../app';
import db from '../../../models/index';
import getToken from '../../helpers/gettokens';
import orderData from '../../helpers/test-data/orders';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Orders API routes', (done) => {
  const admin = {
    id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
    admin: true
  };

  const customer = {
    id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
    admin: false
  };

  const adminToken = getToken(admin);
  const customerToken = getToken(customer);

  describe('GET /api/v1/orders', (done) => {
    it('should return all orders', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Orders retrieved successfully!');
        res.body.should.have.property('orders');
        expect(res.body.orders).to.be.an('array');
        res.body.orders.forEach(order => {
          order.should.be.an('object');
          order.should.have.property('id');
          order.should.have.property('UserId');
          order.should.have.property('deliveryAddress');
          order.should.have.property('totalPrice');
          order.should.have.property('User');
          order.should.have.property('Meals');
          order.Meals.should.be.an('array');
          order.Meals[0].OrderMeal.should.have.property('portion');
          order.Meals[0].OrderMeal.portion.should.be.a('number');
        });
        done();
      });
    });

    it('should not allow customers get all orders', (done) => {
      chai.request(app.listen())
      .get('/api/v1/orders')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);

        done();
      });
    });
  });

  describe('POST /api/v1/orders', (done) => {
    it('should place order', (done) => {
      chai.request(app.listen())
      .post('/api/v1/orders')
      .set('Authorization', customerToken)
      .send(orderData[0])
      .end((err, res) => {
        if(err) return done(err);

        // check if it's opening hours or not
        if(moment().hour() >= 7 && moment().hour() <= 18) {
          expect(res.status).to.equal(200);
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
      .set('Authorization', adminToken)
      .send(orderData[1])
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
      .set('Authorization', customerToken)
      .send({
          deliveryAddress: 'maryland Lagos',
          totalPrice: 4000,
          meals: [
            {
              id: '',
              portion: 2
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
  });

  describe('PUT /api/v1/orders/:id', (done) => {
    it('should update order', (done) => {
      chai.request(app.listen())
      .put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4')
      .set('Authorization', customerToken)
      .send(orderData[1])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Update successfull');

        done();
      });
    });

    it('should not allow admin update orders', (done) => {
      chai.request(app.listen())
      .put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4')
      .set('Authorization', adminToken)
      .send(orderData[1])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!'); 

        done();
      });
    });

    it('should not update orders if input incomplete', (done) => {
      chai.request(app.listen())
      .put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4')
      .set('Authorization', customerToken)
      .send({
          deliveryAddress: 'maryland Lagos',
          totalPrice: 4000,
          meals: [
            {
              id: '',
              portion: 2
            }
          ]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('meal entry is not correct'); 

        done();
      });
    });
  });

  describe('DELETE /api/v1/orders/:id', (done) => {
    it('should delete order if customer', (done) => {
      chai.request(app.listen())
      .del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);

        done();
      });
    });

    it('should not allow admin delete   order', (done) => {
      chai.request(app.listen())
      .del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!'); 

        done();
      });
    });
  });
});