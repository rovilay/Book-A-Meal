function adminOnly(req, res, next) {
  
  if(req.userData.user.admin) {
    return next();
  }
  
  return res.status(403).send({
    message: 'User not allowed!'
  });
}

export default adminOnly;