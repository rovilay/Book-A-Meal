'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _swagger = require('../swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); //

/* eslint no-console: off */

var app = (0, _express2.default)();
var port = process.env.PORT || 5000;
var corsOption = {
  origin: 'http://localhost:9000',
  optionSuccessStatus: 200
};

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cors2.default)());

app.options('*', (0, _cors2.default)(corsOption));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to Book-A-Meal!' });
// });

// Swagger docs routes
app.use('/api/v1/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));

if (process.env.NODE_ENV === 'production') {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/public')));
} else {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/public')));
}
app.use(_usersRoutes2.default);
app.use(_menuRoutes2.default);
app.use(_mealRoutes2.default);
app.use(_ordersRoutes2.default);
app.use(_errorHandler2.default);

// Serve client pages
if (process.env.NODE_ENV === 'production') {
  console.log('prod >>>>', _path2.default.join(__dirname, '../../client/public/index.html'));
  app.get('*', function (req, res) {
    return res.sendFile(_path2.default.join(__dirname, '../../client/public/index.html'));
  });
} else {
  console.log('dev >>>>', _path2.default.join(__dirname, '../../client/public/index.html'));
  app.get('*', function (req, res) {
    return res.sendFile(_path2.default.join(__dirname, '../../client/public/index.html'));
  });
}

app.listen(port, function () {
  console.log('Sever is running at port ' + port);
});

exports.default = app;