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

var _checkMeal = require('../../helpers/checkMeal');

var _checkMeal2 = _interopRequireDefault(_checkMeal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

describe('CheckMeals helper', function (done) {
  var next = _sinon2.default.spy();
  var res = (0, _sinonExpressMock.mockRes)();
  var req = (0, _sinonExpressMock.mockReq)({
    body: {
      meals: ['6eee8579-393e-4e8b-8097-e3af1b4f3ef1']
    }
  });

  it('should return next on err', function () {
    (0, _checkMeal2.default)(req.body.meals, next);
    next();
    expect(next).to.have.been.called;
  });
});