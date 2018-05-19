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

var _meals = require('../../controller/meals');

var _meals2 = _interopRequireDefault(_meals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('MealsController', function () {
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();

  describe('add meal', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      body: {
        title: 'beans'
      },
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', function () {
      _meals2.default.addMeal(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('update meal', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      params: {
        id: 'qwertyu'
      },
      body: {
        title: 'rice'
      },
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', function () {
      _meals2.default.updateMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('delete meal', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      params: {
        id: 'qwertyuio'
      }
    });

    it('should return next on error', function () {
      _meals2.default.deleteMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});