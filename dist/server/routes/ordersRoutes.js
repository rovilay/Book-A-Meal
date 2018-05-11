'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _orders = require('../controller/orders');

var _orders2 = _interopRequireDefault(_orders);

var _orders3 = require('../middlewares/validate/orders');

var _orders4 = _interopRequireDefault(_orders3);

var _checktime = require('../middlewares/checktime');

var _checktime2 = _interopRequireDefault(_checktime);

var _customerOnly = require('../middlewares/customerOnly');

var _customerOnly2 = _interopRequireDefault(_customerOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ordersRouter = _express2.default.Router();

ordersRouter.get('/api/v1/orders', _orders2.default.getAllOrders);

ordersRouter.post('/api/v1/orders', _customerOnly2.default, _checktime2.default.canOrder, _orders4.default, _orders2.default.postOrder);

ordersRouter.put('/api/v1/orders/:id', _customerOnly2.default, _checktime2.default.canUpdate, _orders4.default, _orders2.default.updateOrder);

ordersRouter.delete('/api/v1/orders/:id', _customerOnly2.default, _checktime2.default.canUpdate, _orders2.default.deleteOrder);

exports.default = ordersRouter;