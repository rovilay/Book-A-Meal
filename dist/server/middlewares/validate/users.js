'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'login',
    value: function login(req, res, next) {
      var keys = ['email', 'password'];
      keys.forEach(function (key) {
        // check if undefined or empty
        if (req.body['' + key] === undefined || req.body['' + key] === '') {
          return res.status(400).send({
            success: false,
            message: key + ' field is empty'
          });
        }
      });
      next();
    }
  }, {
    key: 'signup',
    value: function signup(req, res, next) {
      var keys = ['firstName', 'lastName', 'email', 'password', 'address', 'Phone', 'city', 'state'];

      keys.forEach(function (key) {
        // check if undefined or empty
        if (req.body['' + key] === undefined || req.body['' + key] === '') {
          return res.status(400).send({
            success: false,
            message: key + ' field is empty'
          });
        }
      });

      return next();
    }
  }]);

  return User;
}();

exports.default = User;