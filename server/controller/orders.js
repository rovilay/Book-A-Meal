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
    const { id: UserId, admin } = req.user;

    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;

    db.Order.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      },
      {
        model: db.Meal,
        attributes: ['UserId'],
        where: (admin) && { UserId },
        paranoid: true,
        through: {
          attributes: ['portion', 'cost'],
        },
      }
      ],
      distinct: true,
      limit,
      where: (!admin) && { UserId },
      order: [['createdAt', 'DESC']],
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
        let grandTotalPrice = 0;
        const ordersWithMealUrl = orders.map((order) => {
          let totalPrice = 0;
          const modifiedOrder = order.get({ plain: true });
          const { Meals } = modifiedOrder;

          Meals.map((meal) => { // map through order  meals to get total price;
            const { portion, cost } = meal.OrderMeal;
            totalPrice += (portion * cost);
            grandTotalPrice += (portion * cost);
          });

          // modifiedOrder.totalPrice = newToT;
          modifiedOrder.totalPrice = totalPrice;
          modifiedOrder.Meals = `/api/v1/orders/${modifiedOrder.id}/meals`;
          return modifiedOrder;
        });

        res.status(200).send({
          success: true,
          message: 'Orders retrieved successfully!',
          grandTotalPrice,
          pagination: paginate(limit, offset, count),
          orders: ordersWithMealUrl
        });

        // db.Order.sum('totalPrice', { where: (!admin) && { UserId } })
        //   .then((grandTotalPrice) => {

        //   })
        //   .catch(err => next(err));
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting orders!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Gets orders meals
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof OrdersController
   */
  static getOrderMeals(req, res, next) {
    const { orderId } = req.params;
    const { id: UserId, admin } = req.user;
    let { limit, offset } = req.query;
    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;

    db.Order.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title'],
        where: (admin) && { UserId },
        paranoid: true,
        through: {
          attributes: ['portion', 'cost', [db.sequelize.literal('SUM(portion * cost)', 'result')]],
        },
      }],
      where: { id: orderId },
      // subQuery,
      limit,
      offset
    })
      .then((response) => {
        const { rows: order, count } = response;

        if (order.length < 1) {
          const err = new Error('Order not found!');
          err.status = 404;
          return next(err);
        }

        db.Order.sum('totalPrice', { where: (!admin) && { UserId } })
          .then(grandTotalPrice => res.status(200).send({
            success: true,
            message: 'Order retrieved successfully!',
            grandTotalPrice,
            pagination: paginate(limit, offset, count),
            order
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
    const { id: UserId } = req.user;
    const orderMeals = newOrder.meals.map(meal => meal.id); // Get all meal id
    const orderPortion = newOrder.meals.map(meal => meal.portion); // Get all meal portion
    const orderMealsCost = newOrder.meals.map(meal => meal.unitPrice); // Get all meal cost
    checkMeal(orderMeals, undefined, next)
      .then((checked) => {
        if (checked) {
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
                  const { id, portion, unitPrice: cost } = meals[i];
                  if (resMeal.id === id) {
                    totPrice += (cost * portion);
                  }
                  i++;
                }
              });
              return totPrice;
            })
            .then((totPrice) => {
              db.Order.create({ // Add order to db
                id: UUID.v4(),
                UserId,
                deliveryAddress: newOrder.deliveryAddress,
                totalPrice: totPrice
              })
                .then((order) => { // Add meal to join table
                  orderMeals.forEach((meal, index) => {
                    order.addMeal(meal, {
                      through: {
                        portion: orderPortion[index],
                        cost: orderMealsCost[index]
                      }
                    })
                      .catch(err => next(err));
                  });
                  res.status(201).send({
                    success: true,
                    message: 'Order placed successfully!',
                    order
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
    const { orderId } = req.params;
    const updatedOrder = req.body;
    const { id: UserId } = req.user;
    const updatedMealsId = updatedOrder.meals.map(meal => meal.id); // Get all meal id
    const updatedMealsPortion = updatedOrder.meals.map(meal => meal.portion); // Get all meal portion
    const updatedMealsCost = updatedOrder.meals.map(meal => meal.cost); // Get all meal cost

    checkMeal(updatedMealsId, undefined, next)
      .then((checked) => {
        if (checked) {
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
                  const { id, portion, cost } = meals[i];
                  if (resMeal.id === id) {
                    totPrice += (cost * portion);
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
                  id: orderId,
                  UserId
                },
              })
                .then((update) => {
                  if (update[0]) {
                    db.OrderMeal.destroy({
                      where: {
                        OrderId: orderId,
                      },
                    });

                    return update;
                  }
                  const err = new Error('Order not found!');
                  err.status = 404;
                  return next(err);
                })
                .then((update) => {
                  if (update) {
                    updatedMealsId.forEach((mealId, index) => {
                      db.OrderMeal.create({
                        OrderId: orderId,
                        MealId: mealId,
                        portion: updatedMealsPortion[index],
                        cost: updatedMealsCost[index]
                      })
                        .catch((err) => {
                          err.status = 400;
                          return next(err);
                        });
                    });
                    res.status(200).send({
                      success: true,
                      message: 'Update successful!',
                      updatedOrder,
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
    const { orderId } = req.params;
    const { id: UserId } = req.user;
    db.Order.destroy({
      where: {
        id: orderId,
        UserId
      },
    })
      .then((destroyed) => {
        if (destroyed) {
          db.OrderMeal.destroy({
            where: {
              OrderId: orderId,
            },
          });

          res.status(204).send({
            success: true,
            message: 'delete successful',
          });
        } else {
          const err = new Error('Order not found!');
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => {
        err = err || new Error('Error occurred while deleting order');
        err.status = 400;
        return next(err);
      });
  }
}

export default OrdersController;
