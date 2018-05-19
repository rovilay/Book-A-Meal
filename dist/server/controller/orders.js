'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrdersController = function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, null, [{
    key: 'getAllOrders',
    value: function getAllOrders(req, res) {
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
          return res.status(204).send({
            message: 'No orders found'
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Orders retrieved successfully',
          orders: orders
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while finding order'
        });
      });
    }
  }, {
    key: 'postOrder',
    value: function postOrder(req, res) {
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
          });
        });
        res.status(200).send({
          success: true,
          message: 'Order placed successfully!'
        });
      }).catch(function (err) {
        return res.status(400).send({
          success: false,
          message: 'Error occured while placing order!',
          err: err
        });
      });
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(req, res) {
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
            });
          });
        }
        res.status(200).send({
          success: true,
          message: 'Update successful'
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while updating'
        });
      });
    }
  }, {
    key: 'deleteOrder',
    value: function deleteOrder(req, res) {
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
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while trying to delete'
        });
      });
    }
  }]);

  return OrdersController;
}();

exports.default = OrdersController;