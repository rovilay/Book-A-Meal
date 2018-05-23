'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _mealRoutes = require('./routes/mealRoutes');

var _mealRoutes2 = _interopRequireDefault(_mealRoutes);

var _menuRoutes = require('./routes/menuRoutes');

var _menuRoutes2 = _interopRequireDefault(_menuRoutes);

var _ordersRoutes = require('./routes/ordersRoutes');

var _ordersRoutes2 = _interopRequireDefault(_ordersRoutes);

var _usersRoutes = require('./routes/usersRoutes');

var _usersRoutes2 = _interopRequireDefault(_usersRoutes);

var _authenticate = require('./middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _swagger = require('./helpers/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-console: off */

require('dotenv').config(); //

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome to Book-A-Meal!' });
});

// Swagger docs routes
app.use('/api/v1/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
app.use(_usersRoutes2.default);

app.use(_authenticate2.default);
app.use(_mealRoutes2.default);
app.use(_menuRoutes2.default);
app.use(_ordersRoutes2.default);
app.use(_errorHandler2.default);

app.listen(port, function () {
  console.log('Sever is running at port ' + port);
});

exports.default = app;