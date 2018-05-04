
/**
 * @class Meals
 */


class Meals {
  static addMeal(req, res) {
    if (req.body.title === undefined || req.body.description === undefined || req.body.price === undefined) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }
  }

  static updateMeal(req, res) {
    if (req.body.title === undefined || req.body.description === undefined || req.body.price === undefined) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required!'
      });
    }
  }
}

export default Meals;