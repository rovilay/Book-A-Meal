/**
 * Checks if user is an admin or not
 *
 * @exports adminOnly
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
function adminOnly(req, res, next) {
  if (req.user.admin === false) {
    const error = new Error('User not allowed!');
    error.status = 403;
    return next(error);
  }

  return next();
}

export default adminOnly;
