'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../../../models/index');

var _index2 = _interopRequireDefault(_index);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _users = require('../../helpers/test-data/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Users API routes', function () {
  var newUser = _users2.default[2];
  describe('POST /api/v1/auth/signup', function (done) {
    it('should return error because email exist', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/auth/signup').send(_users2.default[0]).end(function (err, res) {
        expect(res.status).to.equal(400);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('An error occurred, user already exist!');
        if (err) return done(err);
        done();
      });
    });

    it('should add new user', function (done) {
      newUser.email = 'test@test.com';
      _chai2.default.request(_app2.default.listen()).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        console.log(res.body);
        expect(res.status).to.equal(201);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('user created successfully!');
        if (err) return done(err);
        done();
      });
    });

    it('should not create user if input is incomplete', function (done) {
      newUser.firstName = ''; // set an input to empty
      _chai2.default.request(_app2.default.listen()).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        expect(res.status).to.equal(400);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('firstName field is empty');
        if (err) return done(err);
        done();
      });
    });
  });

  describe('POST /api/v1/auth/login', function (done) {
    it('should not login if email not found', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/auth/login').send({ email: 'ro@gmail.com', password: '1234567' }).end(function (err, res) {
        expect(res.status).to.equal(404);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not found!');
        if (err) return done(err);
        done();
      });
    });

    it('should login in user and return token', function (done) {
      _chai2.default.request(_app2.default.listen()).post('/api/v1/auth/login').send({ email: 'test@test.com', password: '1234567' }).end(function (err, res) {
        expect(res.status).to.equal(200);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('You are logged in!');
        if (err) return done(err);
        done();
      });
    });
  });
});