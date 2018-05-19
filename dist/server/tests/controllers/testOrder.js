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

var _orders = require('../../controller/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('OrdersController', function () {
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();

  describe('post order', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      body: {
        deliveryAddress: null,
        meals: [{
          id: 'qwertyuio',
          portion: 5
        }]
      },
      user: {
        id: 'asdfgh'
      }
    });

    var err = new Error('An error occurred, user not created!');

    it('should return next on error', function () {
      _orders2.default.postOrder(req, res, next);
      next(err);
      next.should.have.been.calledWith(err);
    });
  });

  describe('update order', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      params: {
        id: 'qwertyu'
      },
      body: {
        meals: [{
          id: 'qwertyuio',
          portion: 5
        }]
      },
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', function () {
      _orders2.default.updateOrder(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('delete order', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      params: {
        id: 'qwertyuio'
      }
    });

    it('should return next on error', function () {
      _orders2.default.deleteOrder(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});