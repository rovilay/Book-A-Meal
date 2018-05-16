function adminOnly(req, res, next) {
  if (req.user.admin === false) {
    return res.status(403).end('User not allowed!');
  }

  return next();
}

export default adminOnly;
