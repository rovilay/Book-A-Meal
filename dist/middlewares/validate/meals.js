'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function validatemeal(req, res, next) {
  var keys = ['title', 'description', 'price'];

  keys.forEach(function (key) {
    // check if undefined or empty
    if (req.body['' + key] === undefined || req.body['' + key] === '') {
      return res.status(400).json({
        success: false,
        message: key + ' field is empty'
      });
    }
  });
  return next();
}

exports.default = validatemeal;