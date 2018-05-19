'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonExpressMock = require('sinon-express-mock');

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _users = require('../../controller/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('UsersController', function () {
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();

  describe('sign up users', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      body: {
        email: null,
        Phone: null,
        password: null,
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        admin: null
      }
    });

    it('should return next on error', function () {
      _users2.default.signup(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('Login User', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      body: {
        email: 'loren@gmail.com'
      }
    });

    it('should return next on error', function () {
      _users2.default.login(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});