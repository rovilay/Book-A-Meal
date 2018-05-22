'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _index = require('../../../models/index');

var _index2 = _interopRequireDefault(_index);

var _meals = require('../../helpers/test-data/meals');

var _meals2 = _interopRequireDefault(_meals);

var _gettokens = require('../../helpers/gettokens');

var _gettokens2 = _interopRequireDefault(_gettokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Meals API routes', function (done) {
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

  describe('POST /api/v1/meals', function (done) {
    it('should post meals to db if admin', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/meals').set('Authorization', 'Bearer ' + adminToken).send(_meals2.default[0]).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meal added successfully');
        if (err) return err;
        done();
      });
    });

    it('should not allow customer', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/meals').set('Authorization', 'Bearer ' + customerToken).send(_meals2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should check for incomplete meal input', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + adminToken).send({
        title: 'Bread and butter',
        description: 'So sweet',
        image: 'https://image.com'
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('price field is empty');

        done();
      });
    });
  });

  describe('GET /api/v1/meals', function (done) {
    it('should return all meals in database if admin', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/meals').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meals retrieved successfully');
        res.body.should.have.property('meals');
        res.body.meals.should.be.an('array');
        res.body.meals.forEach(function (meal) {
          meal.should.be.an('object');
          meal.should.have.property('id');
          meal.should.have.property('title');
          meal.should.have.property('description');
          meal.should.have.property('price');
          meal.should.have.property('image');
          meal.should.have.property('UserId');
          meal.title.should.be.a('string');
          meal.description.should.be.a('string');
          meal.image.should.be.a('string');
          meal.price.should.be.a('number');
        });

        done();
      });
    });

    it('should not allow customers', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/meals').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/meals/:id', function (done) {
    it('should return a single meal if id specified', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185c4c8').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meal retrieved successfully');
        res.body.should.have.property('meal');
        res.body.meal.should.be.an('object');
        res.body.meal.should.have.property('id');
        res.body.meal.should.have.property('title');
        res.body.meal.should.have.property('description');
        res.body.meal.should.have.property('price');
        res.body.meal.should.have.property('image');
        res.body.meal.title.should.be.a('string');
        res.body.meal.description.should.be.a('string');
        res.body.meal.image.should.be.a('string');
        res.body.meal.price.should.be.a('number');

        done();
      });
    });

    it('should return 404 if meal do not exist', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185ffff').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should not allow customers get a meal', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('PUT /api/v1/meals/:id', function (done) {
    it('should update meal if meal exist', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + adminToken).send(_meals2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Update successful!');
        res.body.should.have.property('updatedMeal');
        expect(res.body.updatedMeal.title).to.equal('SHARWAMA');
        expect(res.body.updatedMeal.description).to.equal('So delicious');
        expect(res.body.updatedMeal.price).to.equal(900);
        res.body.updatedMeal.should.have.property('image');
        res.body.updatedMeal.should.have.property('UserId');
        done();
      });
    });

    it('should return error if meal not found', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/meals/3').set('Authorization', 'Bearer ' + adminToken).send(_meals2.default[0]).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while updating meal!');

        done();
      });
    });

    it('should not allow customer update', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + customerToken).send(_meals2.default[0]).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should check for incomplete meal input', function (done) {
      _chai2.default.request(_app2.default.listen()).put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + adminToken).send({
        description: 'So sweet',
        price: 900,
        image: 'https://image.com'
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        // expect(res.body.success).to.equal(false);
        // expect(res.body.message).to.equal('title field is empty');
        done();
      });
    });
  });

  describe('DELETE /api/v1/meals/:id', function (done) {
    it('should delete specified meal', function (done) {
      _chai2.default.request(_app2.default.listen()).delete('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185c4c8').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should not allow customer delete', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff').set('Authorization', 'Bearer ' + customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should return error for wrong id', function (done) {
      _chai2.default.request(_app2.default.listen()).del('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136').set('Authorization', 'Bearer ' + adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Error occurred while deleting meal!');

        done();
      });
    });
  });
});