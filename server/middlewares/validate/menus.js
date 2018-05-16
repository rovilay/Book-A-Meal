
function validatemenu(req, res, next) {
  const keys = ['postOn', 'meals'];

  keys.forEach((key) => {
    // check if undefined or empty
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      return res.status(400).end(`${key} field is empty`);
    }
  });
  next();
}

export default validatemenu;
