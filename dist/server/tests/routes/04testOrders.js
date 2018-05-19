'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _index = require('../../../models/index');

var _index2 = _interopRequireDefault(_index);

var _gettokens = require('../../helpers/gettokens');

var _gettokens2 = _interopRequireDefault(_gettokens);

var _orders = require('../../helpers/test-data/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Orders API routes', function (done) {
  var admin = {
    id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
    admin: true
  };

  var customer = {
    id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
    admin: false
  };

  var adminToken = (0, _gettokens2.default)(admin);
  var customerToken = (0, _gettokens2.default)(customer);

  describe('GET /api/v1/orders', function (done) {
    it('should return all orders', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders').set('Authorization', adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Orders retrieved successfully!');
        res.body.should.have.property('orders');
        expect(res.body.orders).to.be.an('array');
        res.body.orders.forEach(function (order) {
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

    it('should not allow customers get all orders', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders').set('Authorization', customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);

        done();
      });
    });
  });

  describe('POST /api/v1/orders', function (done) {
    it('should place order', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', customerToken).send(_orders2.default[0]).end(function (err, res) {
        if (err) return done(err);

        // check if it's opening hours or not
        if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Order placed successfully!');
        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('it\'s ' + (0, _moment2.default)().format('HH:mm') + ', we are closed for the day, try again tomorrow!');
        }

        done();
      });
    });

    it('should not allow admin place   orders', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', adminToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not place orders if input incomplete', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', customerToken).send({
        deliveryAddress: 'maryland Lagos',
        totalPrice: 4000,
        meals: [{
          id: '',
          portion: 2
        }]
      }).end(function (err, res) {
        if (err) return done(err);

        if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('meal entry is not correct');
        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('it\'s ' + (0, _moment2.default)().format('HH:mm') + ', we are closed for the day, try again tomorrow!');
        }

        done();
      });
    });
  });

  describe('PUT /api/v1/orders/:id', function (done) {
    it('should update order', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', customerToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Update successfull');

        done();
      });
    });

    it('should not allow admin update orders', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', adminToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not update orders if input incomplete', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', customerToken).send({
        deliveryAddress: 'maryland Lagos',
        totalPrice: 4000,
        meals: [{
          id: '',
          portion: 2
        }]
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('meal entry is not correct');

        done();
      });
    });
  });

  describe('DELETE /api/v1/orders/:id', function (done) {
    it('should delete order if customer', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c').set('Authorization', customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(204);

        done();
      });
    });

    it('should not allow admin delete   order', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c').set('Authorization', adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });
  });
});