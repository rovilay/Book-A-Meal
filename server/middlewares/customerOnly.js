function customerOnly(req, res, next) {
  if (req.user.admin === false) {
    return next();
  }

  return res.status(403).send({
    message: 'Only customers are allowed to perform this operation!',
  });
}

export default customerOnly;
