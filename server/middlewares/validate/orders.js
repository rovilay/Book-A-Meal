/* eslint no-restricted-globals: off */

/**
 * Validates sent order inputs
 *
 * @exports validateOrder
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 *  middleware)
 * @return {object} next
 */
function validateOrder(req, res, next) {
  const keys = ['deliveryAddress', 'meals'];
  const newOrder = req.body;
  keys.forEach((key) => {
    if (newOrder[`${key}`] === undefined || newOrder[`${key}`] === '') {
      const err = new Error(`${key} field is empty!`);
      err.status = 400;
      return next(err);
    }
  });

  if (newOrder.meals.length === 0) {
    const err = new Error('meals field is empty!');
    err.status = 400;
    return next(err);
  }

  // check meals content
  const meals = [...newOrder.meals];
  meals.forEach((meal) => {
    if (meal.id === '' || meal.id === undefined ||
    meal.portion === '' || meal.portion === undefined || parseInt(meal.portion, 10) === 0 || isNaN(meal.portion) ||
    meal.price === '' || meal.price === undefined || parseInt(meal.price, 10) === 0 || isNaN(meal.price)
    ) {
      const err = new Error('meal entry is not correct');
      err.status = 400;
      return next(err);
    }
  });

  return next();
}

export default validateOrder;
