'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates sent order inputs
 *
 * @exports validateOrder
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 *  middleware)
 * @return {object} next
 */
function validateOrder(req, res, next) {
  var keys = ['deliveryAddress', 'totalPrice', 'meals'];
  var newOrder = req.body;
  keys.forEach(function (key) {
    if (newOrder['' + key] === undefined || newOrder['' + key] === '') {
      var err = new Error(key + ' field is empty');
      err.status = 400;
      return next(err);
    }

    // check meals content
    var meals = [].concat((0, _toConsumableArray3.default)(newOrder.meals));
    if (meals !== '' || meals !== undefined) {
      // if meals isn't empty check its content
      meals.forEach(function (meal) {
        if (meal.id === '' || meal.id === undefined || meal.portion === '' || meal.portion === undefined) {
          var _err = new Error('meal entry is not correct');
          _err.status = 400;
          return next(_err);
        }
      });
    }
  });

  return next();
}

exports.default = validateOrder;