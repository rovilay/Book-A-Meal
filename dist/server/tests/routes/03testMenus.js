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

var _menus = require('../../helpers/test-data/menus');

var _menus2 = _interopRequireDefault(_menus);

var _gettokens = require('../../helpers/gettokens');

var _gettokens2 = _interopRequireDefault(_gettokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Menus API routes', function (done) {
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

  before(function (done) {
    _index2.default.Meal.create(_meals2.default[3]) // add meal to db
    .then(function () {
      return done();
    }).catch(function (err) {
      done(err);
    });
  });

  describe('GET /api/v1/menus', function (done) {
    it('should get all menus', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/menus').set('Authorization', adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menus retrieved successfully');
        res.body.menus.should.be.an('array');
        res.body.menus.forEach(function (menu) {
          menu.should.be.an('object');
          menu.should.have.property('id');
          menu.should.have.property('postOn');
          menu.should.have.property('UserId');
          menu.should.have.property('User');
          menu.should.have.property('Meals');
          menu.Meals.should.be.an('array');
        });
        done();
      });
    });

    it('should not allow customer get all menus', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/menus').set('Authorization', customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/menus/:DD/:MM/:YYYY', function (done) {
    it('should get menus on specified date only', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/menus/16/05/2018').set('Authorization', adminToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu retrieved successfully');
        res.body.menu.should.be.an('array');
        res.body.menu.forEach(function (menu) {
          menu.should.be.an('object');
          menu.should.have.property('id');
          menu.should.have.property('postOn');
          menu.postOn.should.equal('2018-05-16');
          menu.should.have.property('UserId');
          menu.should.have.property('User');
          menu.should.have.property('Meals');
          menu.Meals.should.be.an('array');
        });
        done();
      });
    });

    it('should allow customers', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/menus/17/05/2018').set('Authorization', customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu retrieved successfully');
        done();
      });
    });

    it('should return error if menu date not found', function (done) {
      _chai2.default.request(_app2.default.listen()).get('/api/v1/menus/30/05/2018').set('Authorization', customerToken).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Could not get menu on date: 2018-05-30');
        done();
      });
    });
  });

  describe('POST /api/v1/menus', function (done) {
    it('should add menu only if admin', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/menus').set('Authorization', adminToken).send(_menus2.default[0]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow customers post menu', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/menus').set('Authorization', customerToken).send(_menus2.default[1]).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if input not correct', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/menus').set('Authorization', adminToken).send({
        postOn: '',
        meals: ['dea6b55b-a9d3-424c-8cfa-e6581185c4c8', '4b62aed4-2610-4340-97ae-c27a8136c2ff']
      }).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('postOn field is empty');
        done();
      });
    });
  });
});