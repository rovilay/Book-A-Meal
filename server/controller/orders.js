import db from '../../models/index';

class OrdersController {
  static getAllOrders(req, res) {
    db.Order.findAll({
      // include: [
      //   {model: db.Meal, as: "orderId"}
      // ]
    })
    .then(order => res.json(order));
  }

  static postOrder(req, res) {
    if (req.body.userId === undefined || req.body.totalPrice === undefined || req.body.meals === undefined) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }

    const createdAt = new Date();
    const newOrder = req.body;

    db.Order.create({
        userId: newOrder.userId,
        totalPrice: newOrder.totalPrice,
        createdAt
      })
      .then((order) => {
        const orderedMeals = [];

        newOrder.meals.forEach(
          (meal) => {
            db.Meal.findById(meal.id, {
                attributes: ["id", "title", "description", "price"]
              })
              .then(result => {
                orderedMeals.push(result);
                db.OrderMeal.create({
                  mealId: result.id,
                  portion: 2,
                  orderId: order.id
                })
                .then(ordMeal => {console.log(ordMeal);})
                .catch(err => {console.log(err);}); 
              })
              .catch(err => res.status(400).send({
                message: 'could not find meal',
                err
              }));
          });
        res.status(200).send({
          order,
          orderedMeals
        });

      })
      .catch(err => res.status(400).send(err));
  }


  //   // present date
  //   const today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');

  //   const order = {
  //     id: parseInt(orders[orders.length - 1].id, 10) + 1,
  //     customerName: req.body.name,
  //     date: today,
  //     meals: req.body.meals
  //   };

  //   // push menu to db
  //   orders.push(order);

  //   return res.status(201).send({
  //     success: true,
  //     message: 'Order added successfully',
  //     orders
  //   });
  // }

  // static updateOrder(req, res) {
  //   const id = parseInt(req.params.id, 10);

  //   if (!req.body.meals || req.body.meals === "" || req.body.meals === "[]") {
  //     return res.status(404).send({
  //       success: false,
  //       message: 'meals is required!'
  //     });
  //   }

  //   function findOrder(order) {
  //     return order.id === id;
  //   }

  //   const foundOrder = orders.find(findOrder);
  //   const foundOrderIndex = orders.findIndex(findOrder);

  //   if (foundOrderIndex === -1) {
  //     return res.status(404).send({
  //       success: false,
  //       message: 'order not found'
  //     });
  //   }

  //   const today = new Date().toISOString().substr(0, 10).split('-').reverse().join('/');

  //   const updatedOrder = {
  //     id: foundOrder.id,
  //     date: foundOrder.date,
  //     modifiedDate: today,
  //     customerName: foundOrder.customerName,
  //     meals: req.body.meals
  //   };

  //   orders.splice(foundOrderIndex, 1, updatedOrder);

  //   return res.status(201).send({
  //     success: true,
  //     message: 'Order updated successfully!',
  //     orders
  //   });
  // }
}

export default OrdersController;