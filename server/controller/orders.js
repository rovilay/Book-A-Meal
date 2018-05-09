import UUID from 'uuid/v4';
import db from '../../models/index';


class OrdersController {
  static getAllOrders(req, res) {
    db.Order.findAll({
        include: [{
          model: db.User,
          attributes: ['firstName', 'lastName']
        }, {
          model: db.Meal,
          attributes: ['id', 'title', 'price'],
          through: {
            attributes: ['portion']
          }
        }]
      })
      .then(orders => {
        if(orders.length < 1) {
          return res.status(204).send({
            message: 'No orders found'
          });
        }
        return res.status(200).send({
        success: true,
        message: 'Menus retrieved successfully',
        orders
      });
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Error occured while finding order'
      }));
  }

  static postOrder(req, res) {
    const newOrder = req.body;
    const orderMeals = newOrder.meals.map((meal) => meal.id); // Get all meal id
    const orderPortion = newOrder.meals.map((meal) => meal.portion); // Get all meal portion

    db.Order.create({
        id: UUID.v4(),
        UserId: req.user.id,
        deliveryAddress: newOrder.deliveryAddress,
        totalPrice: newOrder.totalPrice
      })
      .then(order => {
        orderMeals.forEach((meal, index) => {
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
      })
      .catch((err) => res.status(400).send({
        success: false,
        message: 'Error occured while placing order!',
        err
      }));
  }

  static updateOrder(req, res) {
    const updatedOrder = req.body;
    const updatedMeals = updatedOrder.meals.map((meal) => meal.id); // Get all meal id

    const updatedPortion = updatedOrder.meals.map((meal) => meal.portion); // Get all meal portion
    
    db.Order.update({
        deliveryAddress: updatedOrder.deliveryAddress,
        totalPrice: updatedOrder.totalPrice
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(update => {
        db.OrderMeal.destroy({
          where: {
            OrderId: req.params.id
          }
        });
      
        return update;
      })
      .then(update => {
        if (update) {
          updatedMeals.forEach((meal, index) => {
            db.OrderMeal.create({
              OrderId: req.params.id,
              MealId: meal,
              portion: updatedPortion[index]
            });
          });
        }
        res.status(200).send({
          success: true,
          message: 'Update successful',
        });
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Error occured while updating'
      }));
  }

  static deleteOrder(req, res) {
    db.Order.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(() => {
        db.OrderMeal.destroy({
          where: {
            OrderId: req.params.id
          }
        });
        res.status(204).send({
          success: true,
          message: 'delete successful',
          
        });

      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Error occured while trying to delete'
      }));
  }
}


export default OrdersController;