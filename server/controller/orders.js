/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllOrders", "updateOrder", "postOrder"] }] */
import orders from '../model/ordersdb';

class OrdersController {
  static getAllOrders(req, res) {

    return res.status(200).send({
      success: true,
      message: 'Orders retrieved successfully',
      orders
    });
  }

  static postOrder(req, res) {
    // Check if req has body
    if (!req.body.meals) {
      return res.status(400).send({
        success: false,
        message: 'Meal tray cannot be empty!'
      });
    } else if(!req.body.name) {
      return res.status(400).send({
        success: false,
        message: 'Customer name is empty!'
      });
    }
  

    // present date
    const today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
    
    const order = {
      id: parseInt(orders[orders.length - 1].id, 10) + 1,
      customerName: req.body.name,
      date: today,
      meals:  req.body.meals
    };

    // push menu to db
    orders.push(order);

    return res.status(201).send({
      success: true,
      message: 'Order added successfully',
      orders
    });
  }

  static updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);

    if (!req.body.meals || req.body.meals === "" || req.body.meals === "[]") {
      return res.status(404).send({
        success: false,
        message: 'meals is required!'
      });
    } 

    function findOrder(order) {
      return order.id === id;
    }
    
    const foundOrder = orders.find(findOrder);
    const foundOrderIndex = orders.findIndex(findOrder);

    if (foundOrderIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'order not found'
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

    orders.splice(foundOrderIndex, 1, updatedOrder);

    return res.status(201).send({
      success: true,
      message: 'Order updated successfully!',
      orders
    });
  }
}

export default OrdersController;