function adminOnly(req, res, next) {
  if (req.user.admin === false) {
    return res.status(403).send({
      message: 'User not allowed!',
    });
  }

  next();
}

export default adminOnly;
