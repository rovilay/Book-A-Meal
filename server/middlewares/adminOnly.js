function adminOnly(req, res, next) {
  console.log(req.userData.user.admin);
  if(req.userData.user.admin) {
    return next();
  }
  
  return res.status(403).send({
    message: 'User not allowed!'
  });
}

export default adminOnly;