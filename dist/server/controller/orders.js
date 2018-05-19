'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles operations on Orders routes
 *
 * @exports
 * @class OrdersController
 */
var OrdersController = function () {
  function OrdersController() {
    (0, _classCallCheck3.default)(this, OrdersController);
  }

  (0, _createClass3.default)(OrdersController, null, [{
    key: 'getAllOrders',

    /**
     * Gets all orders
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof OrdersController
     */
    value: function getAllOrders(req, res, next) {
      _index2.default.Order.findAll({
        include: [{
          model: _index2.default.User,
          attributes: ['firstName', 'lastName']
        }, {
          model: _index2.default.Meal,
          attributes: ['id', 'title', 'price'],
          through: {
            attributes: ['portion']
          }
        }]
      }).then(function (orders) {
        if (orders.length < 1) {
          var err = new Error('No order found!');
          err.status = 400;
          return next(err);
        }
        return res.status(200).send({
          success: true,
          message: 'Orders retrieved successfully!',
          orders: orders
        });
      }).catch(function () {
        var err = new Error('Error occurred while getting orders!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Post orders
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof OrdersController
     */

  }, {
    key: 'postOrder',
    value: function postOrder(req, res, next) {
      var newOrder = req.body;
      var orderMeals = newOrder.meals.map(function (meal) {
        return meal.id;
      }); // Get all meal id
      var orderPortion = newOrder.meals.map(function (meal) {
        return meal.portion;
      }); // Get all meal portion

      _index2.default.Order.create({
        id: _v2.default.v4(),
        UserId: req.user.id,
        deliveryAddress: newOrder.deliveryAddress,
        totalPrice: newOrder.totalPrice
      }).then(function (order) {
        orderMeals.forEach(function (meal, index) {
          order.addMeal(meal, {
            through: {
              portion: orderPortion[index]
            }
          }).catch(function (err) {
            return next(err);
          });
        });
        res.status(200).send({
          success: true,
          message: 'Order placed successfully!'
        });
      }).catch(function (err) {
        // err = new Error('Error occurred while placing order!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Updates order based on id
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof OrdersController
     */

  }, {
    key: 'updateOrder',
    value: function updateOrder(req, res, next) {
      var updatedOrder = req.body;
      var updatedMeals = updatedOrder.meals.map(function (meal) {
        return meal.id;
      }); // Get all meal id

      var updatedPortion = updatedOrder.meals.map(function (meal) {
        return meal.portion;
      }); // Get all meal portion

      _index2.default.Order.update({
        deliveryAddress: updatedOrder.deliveryAddress,
        totalPrice: updatedOrder.totalPrice
      }, {
        where: {
          id: req.params.id
        }
      }).then(function (update) {
        _index2.default.OrderMeal.destroy({
          where: {
            OrderId: req.params.id
          }
        });

        return update;
      }).then(function (update) {
        if (update) {
          updatedMeals.forEach(function (meal, index) {
            _index2.default.OrderMeal.create({
              OrderId: req.params.id,
              MealId: meal,
              portion: updatedPortion[index]
            }).catch(function (err) {
              err.status = 409;
              return next(err);
            });
          });
          res.status(200).send({
            success: true,
            message: 'Update successfull'
          });
        }
      }).catch(function (err) {
        // err = new Error('Error occurred while updating order!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Deletes order based on id
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof OrdersController
     */

  }, {
    key: 'deleteOrder',
    value: function deleteOrder(req, res, next) {
      _index2.default.Order.destroy({
        where: {
          id: req.params.id
        }
      }).then(function () {
        _index2.default.OrderMeal.destroy({
          where: {
            OrderId: req.params.id
          }
        });
        res.status(204).send({
          success: true,
          message: 'delete successful'

        });
      }).catch(function (err) {
        err = new Error('Error occurred while deleting order');
        err.status = 400;
        return next(err);
      });
    }
  }]);
  return OrdersController;
}();

exports.default = OrdersController;