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

  getMenu(req, res) {
    // let today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');
    // console.log(today);
    let day = req.params.DD;
    let month = req.params.MM;
    let year = req.params.YYYY;
    let date = `${day}/${month}/${year}`;
    let reqMenu;
    console.log(date);
    menus.forEach(menu => {
      if (menu.date === date) {
        for (let i = 0; i < menu.meals.length; i++) {
          meals.map(meal => {
            if (meal.id === menu.meals[i]) {
              menu.meals[i] = meal;
            }

            if (parseInt(menu.meals[i])) {
              let id = menu.meals[i];
              menu.meals[i] =
                `meal id ${id} not in database`;
            }
          });
        }

        reqMenu = menu;
      }
    });

    return res.status(200).send({
      success: 'true',
      message: 'Menu retrieved successfully',
      menu: reqMenu
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