'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function validateOrder(req, res, next) {
  var keys = ['deliveryAddress', 'totalPrice', 'meals'];

  keys.forEach(function (key) {
    if (req.body['' + key] === undefined || req.body['' + key] === '') {
      return res.status(400).json({
        success: false,
        message: key + ' field is empty'
      });
    }

    // check meals content
    var newOrder = req.body;
    var meals = [].concat(_toConsumableArray(newOrder.meals));
    if (meals !== '' || meals !== undefined) {
      // if meals isn't empty check its content
      meals.forEach(function (meal) {
        if (meal.id === '' || meal.id === undefined || meal.portion === '' || meal.portion === undefined) {
          return res.status(400).json({
            success: false,
            message: meal.id + ' entry is not correct!'
          });
        }
      });
    }
  });

  return next();
}

exports.default = validateOrder;