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

var _authenticate = require('../../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _gettokens = require('../../helpers/gettokens');

var _gettokens2 = _interopRequireDefault(_gettokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_sinonChai2.default);

var should = _chai2.default.should();
var expect = _chai2.default.expect;

var user = {
  id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
  admin: false
};

var token = (0, _gettokens2.default)(user);

describe('Authenticate middleware', function () {
  var res = (0, _sinonExpressMock.mockRes)();

  var reqHeader = (0, _sinonExpressMock.mockReq)({
    headers: {
      authorization: '' + token
    }
  });

  var wrongReqHeader = (0, _sinonExpressMock.mockReq)({
    headers: {
      authorization: 'asdgrtutjjhkj'
    }
  });

  var emptyReqHeader = (0, _sinonExpressMock.mockReq)({
    headers: {}
  });

  var next = _sinon2.default.spy();

  it('should verify and add user object to req object', function () {
    (0, _authenticate2.default)(reqHeader, res, next);
    expect(reqHeader.user).to.not.equal(undefined);
  });

  it('should verify and and call next', function () {
    (0, _authenticate2.default)(reqHeader, res, next);
    next.should.have.been.called;
  });

  it('should return status 401 if token wrong', function () {
    (0, _authenticate2.default)(wrongReqHeader, res, next);
    next.should.have.been.called;
  });

  it('should return status 403 if token undefined', function () {
    (0, _authenticate2.default)(emptyReqHeader, res, next);
    res.status.should.be.calledWith(403);
    res.json.should.be.calledWith({
      success: false,
      message: 'Token is undefined!'
    });
  });
});