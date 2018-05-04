
class Menus {
  static postMenu(req, res) {
    if (!req.body.date) {
      return res.status(400).send({
        success: false,
        message: 'date is empty'
      });
    } else if (!req.body.meals || req.body.meals.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'meals are empty'
      });
    }
  }
}

export default Menus;