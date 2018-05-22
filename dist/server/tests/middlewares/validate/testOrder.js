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

var _orders = require('../../../middlewares/validate/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('validate Order inputs', function () {
  var req1 = (0, _sinonExpressMock.mockReq)({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: ""
    }
  });

  var req2 = (0, _sinonExpressMock.mockReq)({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: []
    }
  });
  var req3 = (0, _sinonExpressMock.mockReq)({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: [{
        id: "",
        portion: 7
      }]
    }
  });
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();

  it('should return next on err', function () {
    (0, _orders2.default)(req1, res, next);
    expect(next).to.have.been.called;
  });

  it('should return next on err', function () {
    (0, _orders2.default)(req2, res, next);
    expect(next).to.have.been.called;
  });

  it('should return next on err', function () {
    (0, _orders2.default)(req3, res, next);
    expect(next).to.have.been.called;
  });
});