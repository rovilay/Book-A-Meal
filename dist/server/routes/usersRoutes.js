'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controller/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../middlewares/validate/users');

var _users4 = _interopRequireDefault(_users3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersRouter = _express2.default.Router();

usersRouter.post('/api/v1/auth/signup', _users4.default.signup, _users2.default.signup);
usersRouter.post('/api/v1/auth/login', _users4.default.login, _users2.default.login);

exports.default = usersRouter;