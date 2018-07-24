'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
/**
 * Handles user signup and log in operations
 * @exports
 * @class UsersController
 */

var UsersController = function () {
  function UsersController() {
    (0, _classCallCheck3.default)(this, UsersController);
  }

  (0, _createClass3.default)(UsersController, null, [{
    key: 'signup',

    /**
     * Adds user
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof UsersController
     */
    value: function signup(req, res, next) {
      // req.body.email = req.body.email.toLowerCase();

      _index2.default.User.create(req.body).then(function () {
        res.status(201).send({
          success: true,
          message: 'user created successfully!'
        });
      }).catch(function (err) {
        err = new Error('An error occurred, user already exist!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Logs in users
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof UsersController
     */

  }, {
    key: 'login',
    value: function login(req, res, next) {
      var loginUser = req.body;
      _index2.default.User.findOne({
        where: {
          email: loginUser.email.toLowerCase()
        },
        attributes: ['id', 'firstName', 'lastName', 'admin', 'password']

      }).then(function (found) {
        var id = found.id,
            firstName = found.firstName,
            lastName = found.lastName,
            admin = found.admin,
            password = found.password;
        // Compare password

        _bcryptjs2.default.compare(loginUser.password, password).then(function (response) {
          if (response) {
            return {
              id: id,
              admin: admin,
              firstName: firstName,
              lastName: lastName
            };
          }

          var err = new Error('Password do not match!');
          err.status = 400;
          throw err;
        }).then(function () {
          // generate token
          _jsonwebtoken2.default.sign({ id: id, admin: admin }, process.env.SECRET, { expiresIn: '24h' }, function (err, token) {
            res.status(200).send({
              success: true,
              message: 'You are logged in!',
              userId: id,
              firstName: firstName,
              lastName: lastName,
              token: token
            });
          });
        }).catch(function (err) {
          return next(err);
        });
      }).catch(function (err) {
        err = new Error('User not found!');
        err.status = 404;
        return next(err);
      });
    }
  }]);
  return UsersController;
}();

exports.default = UsersController;