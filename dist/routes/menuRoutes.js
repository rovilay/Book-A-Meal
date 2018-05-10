'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _menus = require('../controller/menus');

var _menus2 = _interopRequireDefault(_menus);

var _adminOnly = require('../middlewares/adminOnly');

var _adminOnly2 = _interopRequireDefault(_adminOnly);

var _menus3 = require('../middlewares/validate/menus');

var _menus4 = _interopRequireDefault(_menus3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuRouter = _express2.default.Router();

menuRouter.get('/api/v1/menus/:DD/:MM/:YYYY', _menus2.default.getMenu);

menuRouter.get('/api/v1/menus', _adminOnly2.default, _menus2.default.getAllMenus);

menuRouter.post('/api/v1/menus', _adminOnly2.default, _menus4.default, _menus2.default.postMenu);

exports.default = menuRouter;