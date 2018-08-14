import db from '../../models/index';
import checkMeal from '../helpers/checkMeal';
import expire from '../helpers/expire';
import paginate from '../helpers/paginate';


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
    /* eslint prefer-const: 0 */
    let { limit, offset, postOn } = req.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;
    // postOn = (postOn) && moment(postOn).format('YYYY-MM-DD');

    const where = (postOn) && { postOn };
    const subQuery = (postOn) && false;

    db.Menu.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price', 'description', 'image'],
        through: {
          attributes: ['id'],
        }
      }],
      where,
      distinct: Boolean(!postOn),
      order: [['postOn', 'DESC']],
      subQuery,
      offset,
      limit
    })
      .then((response) => {
        const { count, rows: menus } = response;
        if (menus.length < 1 || count === 0) {
          const err = new Error('No menu found!');
          err.status = 404;
          return next(err);
        }

        // map menus to get url
        let n = menus;
        (!postOn)
        &&
        (
          n = menus.map((menu) => {
            const modMenu = menu.get({ plain: true });
            modMenu.Meals = `/api/v1/menus?postOn=${modMenu.postOn}`;
            return modMenu;
          })
        );

        return res.status(200).send({
          success: true,
          message: 'Menus retrieved successfully',
          pagination: paginate(limit, offset, count),
          menus: n
        });
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting all menus!');
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
  static getMenuByDate(req, res, next) {
    const { DD: day, MM: month, YYYY: year } = req.params;
    let { limit, offset } = req.query;
    const date = `${year}-${month}-${day}`;
    limit = Number(limit) || 5;
    offset = Number(offset) || 0;

    db.Menu.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price', 'image', 'description'],
        through: {
          attributes: ['id'],
        },
      }],
      where: {
        postOn: date
      },
      subQuery: false,
      distinct: false,
      offset,
      limit
    })
      .then((response) => {
        const { count, rows: menu } = response;
        if (count === 0) {
          const err = new Error(`Could not get menu on date: ${date}`);
          err.status = 404;
          return next(err);
        }
        res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully',
          pagination: paginate(limit, offset, count),
          menu
        });
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting menu!');
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
        if (check) {
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
    const { DD: day, MM: month, YYYY: year } = req.params;
    const date = `${year}-${month}-${day}`;

    checkMeal(updatedMenu.meals, next)
      .then((check) => {
        if (check) {
          db.Menu.findOne({
            where: { postOn: date },
            attributes: ['id']
          })
            .then((menu) => {
              if (menu !== null) {
                // check if menu can still be updated
                if (expire(date)) {
                  const err = new Error('Can\'t modify menu anymore!');
                  err.status = 405;
                  throw err;
                }

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

  /**
   * Removes meals in menu
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static deleteMealInMenu(req, res, next) {
    const { postOn } = req.query;
    const { meals } = req.body;
    checkMeal(meals, next)
      .then((check) => {
        if (check === true) {
          db.Menu.findOne({
            where: { postOn },
            attributes: ['id']
          })
            .then((menu) => {
              if (menu !== null) {
                // check if menu can still be updated
                if (expire(postOn)) {
                  const err = new Error('Can\'t modify menu anymore!');
                  err.status = 405;
                  throw err;
                }

                meals.forEach((meal) => {
                  db.MenuMeal.destroy({
                    where: {
                      MealId: meal,
                    }
                  })
                    .catch(err => next(err));
                });

                res.status(200).send({
                  success: true,
                  message: 'Meal removed from menu successfully!',
                });
              }

              if (menu === null) {
                const err = new Error(`Menu for date: ${postOn}, not found!`);
                err.status = 404;
                throw err;
              }
            })
            .catch((err) => {
              err = err || new Error('Error occurred while deleting meal!');
              err.status = err.status || 400;
              return next(err);
            });
        }
      });
  }
}

export default MenusController;
