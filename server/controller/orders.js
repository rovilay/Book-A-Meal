import UUID from 'uuid/v4';
import db from '../../models/index';

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
        return res.status(200).send({
          success: true,
          message: 'Orders retrieved successfully!',
          orders,
        });
      })
      .catch(() => {
        const err = new Error('Error occurred while getting orders!');
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

    db.Order.create({
      id: UUID.v4(),
      UserId: req.user.id,
      deliveryAddress: newOrder.deliveryAddress,
      totalPrice: newOrder.totalPrice,
    })
      .then((order) => {
        orderMeals.forEach((meal, index) => {
          order.addMeal(meal, {
            through: {
              portion: orderPortion[index],
            }
          })
            .catch(err => next(err));
        });
        res.status(200).send({
          success: true,
          message: 'Order placed successfully!',
        });
      })
      .catch((err) => {
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
  static updateOrder(req, res, next) {
    const updatedOrder = req.body;
    const updatedMeals = updatedOrder.meals.map(meal => meal.id); // Get all meal id

    const updatedPortion = updatedOrder.meals.map(meal => meal.portion); // Get all meal portion

    db.Order.update({
      deliveryAddress: updatedOrder.deliveryAddress,
      totalPrice: updatedOrder.totalPrice,
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
                err.status = 409;
                return next(err);
              });
          });
          res.status(200).send({
            success: true,
            message: 'Update successfull',
          });

          // .catch(err => next(err));
        }
      })
      .catch((err) => {
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
