/**
 * Validates sent Meal inputs
 *
 * @exports validateMeal
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */

function validateMeal(req, res, next) {
  const keys = ['title', 'description', 'price'];

  keys.forEach((key) => {
    // check if undefined or empty
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      const error = new Error(`${key} field is empty!`);
      error.status = 400;
      return next(error);
    }
  });

  // check if meal price is greater than 0
  if (req.body.price <= 0) {
    const error = new Error('Price must be greater than 0!');
    error.status = 400;
    return next(error);
  }

  return next();
}

export default validateMeal;