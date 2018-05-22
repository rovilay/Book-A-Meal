import UUID from 'uuid/v4';
import db from '../../models/index';
import checkMeal from '../helpers/checkMeal';
/**
 * Handles operations on Orders routes
 *
 * @exports
 * @class OrdersController
 */
class OrdersController {
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
  static getAllOrders(req, res, next) {
    db.Order.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['portion'],
        },
      }],
    })
      .then((orders) => {
        if (orders.length < 1) {
          const err = new Error('No order found!');
          err.status = 400;
          return next(err);
        }

        db.Order.sum('totalPrice')
          .then(grandTotalPrice => res.status(200).send({
            success: true,
            message: 'Orders retrieved successfully!',
            grandTotalPrice,
            orders
          }))
          .catch(err => next(err));
      })
      .catch((err) => {
        err = new Error('Error occurred while getting orders!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Gets orders based on user id
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof OrdersController
   */
  static getOrdersById(req, res, next) {
    const [userId] = [req.params.userId];

    db.Order.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['portion'],
        },
      }],
      where: {
        UserId: userId
      }
    })
      .then((orders) => {
        if (orders.length < 1) {
          const err = new Error('No order found!');
          err.status = 404;
          return next(err);
        }

        db.Order.sum('totalPrice', { where: { UserId: userId } })
          .then(grandTotalPrice => res.status(200).send({
            success: true,
            message: 'Orders retrieved successfully!',
            grandTotalPrice,
            orders
          }))
          .catch(err => next(err));
      })
      .catch((err) => {
        err = new Error('Error occurred while getting orders!');
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
  static postOrder(req, res, next) {
    const newOrder = req.body;
    const orderMeals = newOrder.meals.map(meal => meal.id); // Get all meal id
    const orderPortion = newOrder.meals.map(meal => meal.portion); // Get all meal portion
    checkMeal(orderMeals, next)
      .then((check) => {
        if (check === true) {
          db.Meal.findAll({
            where: { id: orderMeals },
            attributes: ['price']
          })
            .then((meals) => { // calculate order's total price
              let totPrice = 0;
              meals.forEach((meal, index) => {
                totPrice += meal.price * orderPortion[index];
              });
              return totPrice;
            })
            .then((totPrice) => {
              db.Order.create({ // Add order to db
                id: UUID.v4(),
                UserId: req.user.id,
                deliveryAddress: newOrder.deliveryAddress,
                totalPrice: totPrice
              })
                .then((order) => { // Add meal to join table
                  orderMeals.forEach((meal, index) => {
                    order.addMeal(meal, {
                      through: {
                        portion: orderPortion[index],
                      }
                    })
                      .catch(err => next(err));
                  });
                  res.status(201).send({
                    success: true,
                    message: 'Order placed successfully!',
                  });
                })
                .catch((err) => {
                  // err = new Error('Error occurred while placing order!');
                  err.status = 400;
                  return next(err);
                });
            })
            .catch(err => next(err));
        }
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
  static updateOrder(req, res, next) {
    const updatedOrder = req.body;
    const updatedMeals = updatedOrder.meals.map(meal => meal.id); // Get all meal id

    const updatedPortion = updatedOrder.meals.map(meal => meal.portion); // Get all meal portion

    checkMeal(updatedMeals, next)
      .then((check) => {
        if (check === true) {
          db.Meal.findAll({ // find meal and get their price
            where: { id: updatedMeals },
            attributes: ['price']
          })
            .then((meals) => { // calculate order's total price
              let totPrice = 0;
              meals.forEach((meal, index) => {
                totPrice += meal.price * updatedPortion[index];
              });
              return totPrice;
            })
            .then((totPrice) => {
              db.Order.update({
                deliveryAddress: updatedOrder.deliveryAddress,
                totalPrice: totPrice,
              }, {
                where: {
                  id: req.params.id,
                },
              })
                .then((update) => {
                  db.OrderMeal.destroy({
                    where: {
                      OrderId: req.params.id,
                    },
                  });
                  return update;
                })
                .then((update) => {
                  if (update) {
                    updatedMeals.forEach((meal, index) => {
                      db.OrderMeal.create({
                        OrderId: req.params.id,
                        MealId: meal,
                        portion: updatedPortion[index],
                      })
                        .catch((err) => {
                          err.status = 400;
                          return next(err);
                        });
                    });
                    res.status(200).send({
                      success: true,
                      message: 'Update successful',
                    });
                  }
                })
                .catch((err) => {
                  err.status = 400;
                  return next(err);
                });
            });
        }
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
  static deleteOrder(req, res, next) {
    db.Order.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        db.OrderMeal.destroy({
          where: {
            OrderId: req.params.id,
          },
        });
        res.status(204).send({
          success: true,
          message: 'delete successful',

        });
      })
      .catch((err) => {
        err = new Error('Error occurred while deleting order');
        err.status = 400;
        return next(err);
      });
  }
}


export default OrdersController;
