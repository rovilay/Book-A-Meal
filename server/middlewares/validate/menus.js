
function validatemenu(req, res, next) {
  const keys = ['postOn', 'meals'];

  keys.forEach((key) => {
    // check if undefined or empty
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      return res.status(400).json({
        success: false,
        message: `${key} field is empty`,
      });
    }
  });
  return next();
}

export default validatemenu;
