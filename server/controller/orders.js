/* eslint no-uneeded ternary: 0 */
import UUID from 'uuid/v4';
import db from '../../models/index';
import checkMeal from '../helpers/checkMeal';
import paginate from '../helpers/paginate';

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
    let { limit, offset } = req.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;

    db.Order.findAndCountAll({
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
      distinct: true,
      limit,
      offset
    })
      .then((response) => {
        const { rows: orders, count } = response;
        if (orders.length < 1) {
          const err = new Error('No order found!');
          err.status = 400;
          return next(err);
        }

        // map orders to get url
        const n = orders.map((order) => {
          const modOrder = order.get({ plain: true });
          modOrder.Meals = `/api/v1/orders/${modOrder.UserId}?id=${modOrder.id}`;
          return modOrder;
        });

        db.Order.sum('totalPrice')
          .then(grandTotalPrice => res.status(200).send({
            success: true,
            message: 'Orders retrieved successfully!',
            grandTotalPrice,
            pagination: paginate(limit, offset, count),
            orders: n
          }))
          .catch(err => next(err));
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting orders!');
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
  static getOrdersByUserId(req, res, next) {
    const { userId: UserId } = req.params;
    const { id } = req.query;
    let { limit, offset } = req.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;

    const where = (id) ? { id } : { UserId };
    const subQuery = (id) && false;

    db.Order.findAndCountAll({
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
      where,
      distinct: Boolean(!id), // setting distinct false if order id is present so as to read the count properly
      subQuery,
      limit,
      offset
    })
      .then((response) => {
        const { rows: orders, count } = response;

        if (orders.length < 1) {
          const err = new Error('No order found!');
          err.status = 404;
          return next(err);
        }

        // map orders to get url
        let n = orders;
        (!id)
        &&
        (
          n = orders.map((order) => {
            const modOrder = order.get({ plain: true });
            modOrder.Meals = `/api/v1/orders/${modOrder.UserId}?id=${modOrder.id}`;
            return modOrder;
          })
        );

        db.Order.sum('totalPrice', { where })
          .then(grandTotalPrice => res.status(200).send({
            success: true,
            message: 'Orders retrieved successfully!',
            grandTotalPrice,
            pagination: paginate(limit, offset, count),
            orders: n
          }))
          .catch(err => next(err));
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting orders!');
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
            attributes: ['id', 'price']
          })
            .then((resMeals) => { // calculate order's total price
              let totPrice = 0;
              resMeals.forEach((resMeal) => {
                const { meals } = newOrder;
                let i = 0;
                while (i < meals.length) {
                  const { id, portion } = meals[i];
                  if (resMeal.id === id) {
                    totPrice += (resMeal.price * portion);
                  }
                  i++;
                }
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
    const updatedMealsId = updatedOrder.meals.map(meal => meal.id); // Get all meal id
    const updatedMealsPortion = updatedOrder.meals.map(meal => meal.portion); // Get all meal portion

    checkMeal(updatedMealsId, next)
      .then((check) => {
        if (check === true) {
          db.Meal.findAll({ // find meal and get their price
            where: { id: updatedMealsId },
            attributes: ['id', 'price']
          })
            .then((resMeals) => { // calculate order's total price
              let totPrice = 0;
              resMeals.forEach((resMeal) => {
                const { meals } = updatedOrder;
                let i = 0;
                while (i < meals.length) {
                  const { id, portion } = meals[i];
                  if (resMeal.id === id) {
                    totPrice += (resMeal.price * portion);
                  }
                  i++;
                }
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
                    updatedMealsId.forEach((meal, index) => {
                      db.OrderMeal.create({
                        OrderId: req.params.id,
                        MealId: meal,
                        portion: updatedMealsPortion[index],
                      })
                        .catch((err) => {
                          err.status = 400;
                          return next(err);
                        });
                    });
                    res.status(200).send({
                      success: true,
                      message: 'Update successful',
                      updatedOrder
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
        err = err || new Error('Error occurred while deleting order');
        err.status = 400;
        return next(err);
      });
  }
}

export default OrdersController;
