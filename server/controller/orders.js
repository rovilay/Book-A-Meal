/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllOrders", "updateOrder", "postOrder"] }] */
import orders from '../model/ordersdb';

class OrdersController {
  getAllOrders(req, res) {

    return res.status(200).send({
      success: 'true',
      message: 'Menus retrieved successfully',
      orders
    });
  }

  postOrder(req, res) {
    if (!req.body.meals) {
      return res.status(400).send({
        success: 'false',
        message: 'Meal tray cannot be empty!'
      });
    } else if(!req.body.name) {
      return res.status(400).send({
        success: 'false',
        message: 'Customer name is empty!'
      });
    }
  

    // present date
    const today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
    
    const order = {
      id: parseInt(orders[orders.length - 1].id, 10) + 1,
      customerName: req.body.name,
      date: today,
      meals: req.body.meals
    };

    // push menu to db
    orders.push(order);

    return res.status(201).send({
      success: 'true',
      message: 'Menu added successfully',
      orders
    });
  }

  updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    let foundOrder;
    let orderIndex;

    orders.map((order, index) => {
      if (order.id === id) {
        foundOrder = order;
        orderIndex = index;
      }
    });
    if (!foundOrder) {
      return res.status(404).send({
        success: 'false',
        message: 'order not found'
      });
    }
    if (!req.body.meals || req.body.meals === "" || req.body.meals === "[]") {
      return res.status(404).send({
        success: 'false',
        message: 'meals is required!'
      });
    } 

    const today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');

    const updatedOrder = {
      id: foundOrder.id,
      date: foundOrder.date,
      modifiedDate: today,
      customerName: foundOrder.customerName,
      meals: req.body.meals
    };

    orders.splice(orderIndex, 1, updatedOrder);

    return res.status(201).send({
      success: 'true',
      message: 'Meal updated successfully!',
      orders
    });
  }
}

const ordersController = new OrdersController();
export default ordersController;