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
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Orders retrieved successfully!');
        res.body.should.have.property('grandTotalPrice');
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
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);

        done();
      });
    });
  });

  describe('POST /api/v1/orders', function (done) {
    it('should place order', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', 'Bearer ' + customerToken).send(_orders2.default[0]).end(function (err, res) {
        if (err) return done(err);

        // check if it's opening hours or not
        if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
          expect(res.status).to.equal(201);
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
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', 'Bearer ' + adminToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not place orders if input incomplete', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', 'Bearer ' + customerToken).send({
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

    it('should throw error if meal not found in db', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/orders').set('Authorization', 'Bearer ' + customerToken).send({
        deliveryAddress: 'maryland Lagos',
        meals: [{
          id: '32947007-da1b-4bc1-ad3a-8cc106dee9fb',
          portion: 2
        }]
      }).end(function (err, res) {
        if (err) return done(err);
        if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('meal with id: 32947007-da1b-4bc1-ad3a-8cc106dee9fb, not found!');
        } else {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('it\'s ' + (0, _moment2.default)().format('HH:mm') + ', we are closed for the day, try again tomorrow!');
        }

        done();
      });
    });
  });

  describe('GET /api/v1/orders/:userId', function (done) {
    it('should return all orders placed by specified user', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders/618ef639-4729-4256-bdf4-54ff2e6a61d9').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Orders retrieved successfully!');
        res.body.should.have.property('grandTotalPrice');
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

    it('should allow admin get all orders by specified customer id', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders/618ef639-4729-4256-bdf4-54ff2e6a61d9').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);

        done();
      });
    });

    it('should return 404 for not found user', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/orders/daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(404);

        done();
      });
    });
  });

  describe('PUT /api/v1/orders/:id', function (done) {
    it('should update order', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', 'Bearer ' + customerToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Update successful');

        done();
      });
    });

    it('should not allow admin update orders', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', 'Bearer ' + adminToken).send(_orders2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });

    it('should not update orders if input incomplete', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', 'Bearer ' + customerToken).send({
        deliveryAddress: 'maryland Lagos',
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

    it('should throw error if meal not found in db', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a5034-8ea5-4251-a14c-9c59c01244a4').set('Authorization', 'Bearer ' + customerToken).send({
        deliveryAddress: 'maryland Lagos',
        meals: [{
          id: '32947007-da1b-4bc1-ad3a-8cc106dee9fb',
          portion: 2
        }]
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('meal with id: 32947007-da1b-4bc1-ad3a-8cc106dee9fb, not found!');

        done();
      });
    });

    it('should not update orders if request params is wrong', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/orders/702a503').set('Authorization', 'Bearer ' + customerToken).send({
        deliveryAddress: 'maryland Lagos',
        meals: [{
          id: '4b62aed4-2610-4340-97ae-c27a8136c2ff',
          portion: 2
        }]
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(500);

        done();
      });
    });
  });

  describe('DELETE /api/v1/orders/:id', function (done) {
    it('should delete order if customer', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(204);

        done();
      });
    });

    it('should not allow admin delete   order', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/orders/3dde5a6b-7555-4a82-bd17-550e4e7ddb7c').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Only customers are allowed to perform this operation!');

        done();
      });
    });
  });
});