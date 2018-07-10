'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meals = require('../controller/meals');

var _meals2 = _interopRequireDefault(_meals);

var _meals3 = require('../middlewares/validate/meals');

var _meals4 = _interopRequireDefault(_meals3);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _adminOnly = require('../middlewares/adminOnly');

var _adminOnly2 = _interopRequireDefault(_adminOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mealRouter = _express2.default.Router();

mealRouter.use('/api/v1/meals', _authenticate2.default);
mealRouter.get('/api/v1/meals', _adminOnly2.default, _meals2.default.getAllMeals);
mealRouter.get('/api/v1/meals/:id', _adminOnly2.default, _meals2.default.getMeal);
mealRouter.delete('/api/v1/meals/:id', _adminOnly2.default, _meals2.default.deleteMeal);
mealRouter.post('/api/v1/meals', _adminOnly2.default, _meals4.default, _meals2.default.addMeal);
mealRouter.put('/api/v1/meals/:id', _adminOnly2.default, _meals4.default, _meals2.default.updateMeal);

exports.default = mealRouter;