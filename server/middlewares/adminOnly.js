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
    const err = new Error('User not allowed!');
    err.status = 403;
    return next(err);
  }

  return next();
}

export default adminOnly;
