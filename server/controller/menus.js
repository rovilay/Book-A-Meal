import db from '../../models/index';
import checkMeal from '../helpers/checkMeal';

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
        }
      }],
    })
      .then((menus) => {
        if (menus === null || menus.length === 0) {
          const err = new Error('No menu found!');
          err.status = 404;
          return next(err);
        }

        return res.status(200).send({
          success: true,
          message: 'Menus retrieved successfully',
          menus
        });
      })
      .catch((err) => {
        err = new Error('Error occurred while getting all menus!');
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
      .catch((err) => {
        err = new Error('Error occurred while getting menu!');
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
    checkMeal(newMenu.meals, next)
      .then((check) => {
        if (check === true) {
          db.Menu.findOrCreate({
            where: { postOn: newMenu.postOn },
            defaults: { UserId: req.user.id }
          })
            .then((menu) => {
              if (menu[1] === true) {
                menu[0].addMeals(newMenu.meals)
                  .then(() => {
                    res.status(201).send({
                      success: true,
                      message: 'Menu posted successfully!',
                    });
                  })
                  .catch(err => next(err));
              } else {
                const err = new Error(`Menu for date: ${newMenu.postOn} have already been posted!`);
                err.status = 400;
                throw err;
              }
            })
            .catch(err => next(err));
        }
      });
  }


  /**
   * Updates Menu  by date
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static updateMenu(req, res, next) {
    const updatedMenu = req.body;
    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${year}-${month}-${day}`;
    checkMeal(updatedMenu.meals, next)
      .then((check) => {
        if (check === true) {
          db.Menu.findOne({
            where: { postOn: date },
            attributes: ['id']
          })
            .then((menu) => {
              if (menu !== null) {
                db.MenuMeal.destroy({
                  where: {
                    MenuId: menu.id,
                  }
                });

                updatedMenu.meals.forEach((meal) => {
                  db.MenuMeal.create({
                    MenuId: menu.id,
                    MealId: meal
                  })
                    .catch(err => next(err));
                });

                res.status(200).send({
                  success: true,
                  message: 'Menu updated successfully!',
                });
              } else {
                const err = new Error(`Menu for date: ${date}, not found!`);
                err.status = 404;
                throw err;
              }
            })
            .catch(err => next(err));
        }
      });
  }
}

export default MenusController;
