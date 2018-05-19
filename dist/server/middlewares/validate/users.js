'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates login and signup inputs
 *
 * @exports User
 * @class User
 */
var User = function () {
  function User() {
    (0, _classCallCheck3.default)(this, User);
  }

  (0, _createClass3.default)(User, null, [{
    key: 'login',

    /**
     * Validates sent login inputs
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param  {object} next - nex object (for handling errors or moving to next
     * middleware)
     * @return {object} next
     * @memberof User
     */
    value: function login(req, res, next) {
      var keys = ['email', 'password'];
      keys.forEach(function (key) {
        // check if undefined or empty
        if (req.body['' + key] === undefined || req.body['' + key] === '') {
          var err = new Error(key + ' field is empty');
          err.status = 400;
          return next(err);
        }
      });
      return next();
    }

    /**
     * Validates sent signup inputs
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param  {object} next - nex object (for handling errors or moving to next
     * middleware)
     * @return {object} next
     * @memberof User
     */

  }, {
    key: 'signup',
    value: function signup(req, res, next) {
      var keys = ['firstName', 'lastName', 'email', 'password', 'address', 'Phone', 'city', 'state'];

      keys.forEach(function (key) {
        // check if undefined or empty
        if (req.body['' + key] === undefined || req.body['' + key] === '') {
          var err = new Error(key + ' field is empty');
          err.status = 400;
          return next(err);
        }
      });

      return next();
    }
  }]);
  return User;
}();

exports.default = User;