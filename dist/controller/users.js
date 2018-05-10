'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'signup',
    value: function signup(req, res) {
      req.body.email = req.body.email.toLowerCase();

      _index2.default.User.create(req.body).then(function () {
        res.status(201).send({
          success: true,
          message: 'user created successfully!'
        });
      }).catch(function () {
        res.status(400).send({
          success: true,
          message: 'An error occurred, user not created'
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res) {
      var loginUser = req.body;
      _index2.default.User.findOne({
        where: {
          email: loginUser.email.toLowerCase()
        },
        attributes: ['id', 'admin', 'password']

      }).then(function (found) {
        // Compare password
        _bcryptjs2.default.compare(loginUser.password, found.password).then(function (response) {
          if (response === false) {
            return res.status(400).send('Password do not Match');
          }
          return {
            id: found.id,
            admin: found.admin
          };
        }).then(function (user) {
          // generate token
          _jsonwebtoken2.default.sign({ user: user }, process.env.SECRET, { expiresIn: '24h' }, function (err, token) {
            res.status(200).send({
              success: true,
              message: 'You are logged in!',
              token: token
            });
          });
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while trying to log in.'
        });
      });
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;