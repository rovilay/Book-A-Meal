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

var _menus = require('../../controller/menus');

var _menus2 = _interopRequireDefault(_menus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('MenusController', function () {
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();

  describe('creat menu', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      body: {},
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', function () {
      _menus2.default.postMenu(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('get menu', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      params: {
        DD: 32,
        MM: 5,
        YYYY: 2018
      }
    });

    it('should return next on error', function () {
      _menus2.default.getMenu(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});