/**
 * Checks if user is a customer
 *
 * @param  {any} req - Request object
 * @param  {any} res - Response object
 * @param  {any} next - next object (for error handling or moving to next
 * middleware)
 * @return {object | next}
 */
function customerOnly(req, res, next) {
  if (req.user.admin === false) {
    return next();
  }

  const err = new Error('Only customers are allowed to perform this operation!');
  err.status = 403;
  return next(err);
}

export default customerOnly;
