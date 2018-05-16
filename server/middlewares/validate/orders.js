function validateOrder(req, res, next) {
  const keys = ['deliveryAddress', 'totalPrice', 'meals'];

  keys.forEach((key) => {
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      return res.status(400).end(`${key} field is empty`);
    }

    // check meals content
    const newOrder = req.body;
    const meals = [...newOrder.meals];
    if (meals !== '' || meals !== undefined) { // if meals isn't empty check its content
      meals.forEach((meal) => {
        if (meal.id === '' || meal.id === undefined || meal.portion === '' || meal.portion === undefined) {
          return res.status(400).end(`${meal.id} entry is not correct`);
        }
      });
    }
  });

  return next();
}

export default validateOrder;
