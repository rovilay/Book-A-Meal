'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function adminOnly(req, res, next) {
  if (req.user.admin) {
    return next();
  }

  return res.status(403).send({
    message: 'User not allowed!'
  });
}

exports.default = adminOnly;