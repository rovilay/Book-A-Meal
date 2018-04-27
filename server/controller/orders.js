import meals from '../model/mealsdb';
import orders from '../model/ordersdb';

class OrdersController {
  getAllOrders(req, res) {

    return res.status(200).send({
      success: 'true',
      message: 'Menus retrieved successfully',
      orders: orders
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
      id: parseInt(orders[orders.length - 1].id) + 1,
      customerName: req.body.name,
      date: today,
      meals: req.body.meals
    };

    // push menu to db
    orders.push(order);

    return res.status(201).send({
      success: 'true',
      message: 'Menu added successfully',
      orders: orders
    });
  }
}

const ordersController = new OrdersController();
export default ordersController;