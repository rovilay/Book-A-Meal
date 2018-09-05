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
      const error = new Error(`${key} field is empty!`);
      error.status = 400;
      return next(error);
    }
  });

  if (newOrder.meals.length === 0) {
    const error = new Error('meals field is empty!');
    error.status = 400;
    return next(error);
  }

  // check meals content
  const meals = [...newOrder.meals];
  meals.forEach((meal) => {
    let unitPrice;
    (meal.cost) && (unitPrice = meal.cost);
    (meal.unitPrice) && ({ unitPrice } = meal);

    if (meal.id === '' || meal.id === undefined ||
    meal.portion === '' || meal.portion === undefined || parseInt(meal.portion, 10) === 0 || isNaN(meal.portion) ||
    unitPrice === '' || unitPrice === undefined || parseInt(unitPrice, 10) === 0 || isNaN(unitPrice)
    ) {
      const error = new Error('meal entry is not correct');
      error.status = 400;
      return next(error);
    }
  });

  return next();
}

export default validateOrder;
