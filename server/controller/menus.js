import db from '../../models/index';

/**
 * Handles operations on menu routes
 *
 * @exports
 * @class MenusController
 */
class MenusController {
  /**
   * Gets all menus
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static getAllMenus(req, res, next) {
    db.Menu.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id'],
        },
      }],
    })
      .then(menu => res.status(200).send({
        success: true,
        message: 'Menus retrieved successfully',
        menus: menu,
      }))
      .catch(() => {
        const err = new Error('Error occurred while getting all menus!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Gets a menu based on "post On" date
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static getMenu(req, res, next) {
    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${year}-${month}-${day}`;

    db.Menu.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id'],
        },
      }],
      where: {
        postOn: date,
      },
    })
      .then((menu) => {
        if (menu.length === 0) {
          const err = new Error(`Could not get menu on date: ${date}`);
          err.status = 404;
          return next(err);
        }
        res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully',
          menu,
        });
      })
      .catch(() => {
        const err = new Error('Error occurred while getting menu!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Posts menu for a specified date
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static postMenu(req, res, next) {
    const newMenu = req.body;

    db.Menu.create({
      UserId: req.user.id,
      postOn: newMenu.postOn,
    })
      .then((menu) => {
        menu.addMeals(newMenu.meals);
        res.status(200).send({
          success: true,
          message: 'Menu posted successfully!',
        });
      })
      .catch(() => {
        const err = new Error('Error occurred while posting menu!');
        err.status = 400;
        return next(err);
      });
  }
}

export default MenusController;
