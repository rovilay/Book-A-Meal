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

var _adminOnly = require('../../middlewares/adminOnly');

var _adminOnly2 = _interopRequireDefault(_adminOnly);

var _gettokens = require('../../helpers/gettokens');

var _gettokens2 = _interopRequireDefault(_gettokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

var admin = {
  id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
  admin: true
};

var customer = {
  id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
  admin: false
};

describe('AdminOnly middleware', function () {
  var res = (0, _sinonExpressMock.mockRes)();
  var next = _sinon2.default.spy();
  var err = new Error('User not allowed!');

  it('should call next if admin', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      user: admin
    });

    (0, _adminOnly2.default)(req, res, next);
    next.should.have.been.called;
  });

  it('should call next with err if customer', function () {
    var req = (0, _sinonExpressMock.mockReq)({
      user: customer
    });

    (0, _adminOnly2.default)(req, res, next);
    next.should.have.been.called;
  });
});