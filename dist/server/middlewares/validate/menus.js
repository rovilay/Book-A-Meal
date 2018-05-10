'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function validatemenu(req, res, next) {
  var keys = ['postOn', 'meals'];

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

exports.default = validatemenu;