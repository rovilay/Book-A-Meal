import moment from 'moment';

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
    // const { id: UserId } = req.user;
    let { limit, offset } = req.query;
    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;

    db.Menu.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      },
      // {
      //   model: db.Meal,
      //   where: { UserId },
      //   through: {
      //     attributes: ['id'],
      //   },
      // }
      ],
      order: [['postOn', 'DESC']],
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
        const menusWithMealUrl = menus.map((menu) => {
          const modMenu = menu.get({ plain: true });
          modMenu.Meals = `/api/v1/menus/${modMenu.id}/meals`;
          return modMenu;
        });

        return res.status(200).send({
          success: true,
          message: 'Menus retrieved successfully',
          pagination: paginate(limit, offset, count),
          menus: menusWithMealUrl
        });
      })
      .catch((err) => {
        err = err || new Error('Error occurred while getting all menus!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Gets meals of a menu
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static getMenuMeals(req, res, next) {
    const { menuId } = req.params;
    const { id: UserId } = req.user;

    /* eslint prefer-destructuring: 0 */

    let { limit, offset } = req.query;
    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;

    db.Menu.findAndCountAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName'],
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price', 'image', 'description'],
        where: { UserId },
        through: {
          attributes: ['id'],
        },
      }],
      where: {
        id: menuId
      },
      subQuery: false,
      offset,
      limit
    })
      .then((response) => {
        const { count, rows: menu } = response;
        if (count < 1) {
          const errMsg = 'Your meals are not in this menu';
          const err = new Error(errMsg);
          err.status = 404;
          return next(err);
        }

        res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully!',
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
   * Gets menu for the current day
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static getTodayMenu(req, res, next) {
    const today = moment().format('YYYY-MM-DD');

    let { limit, offset } = req.query;
    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;
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
        postOn: today
      },
      subQuery: false,
      offset,
      limit
    })
      .then((response) => {
        const { count, rows: menu } = response;
        if (count < 1) {
          const errMsg = `Menu on date: ${today} not found!`;
          const err = new Error(errMsg);
          err.status = 404;
          return next(err);
        }

        res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully!',
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
   * Creates menu
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
    const { meals, postOn } = newMenu;
    const { id: UserId } = req.user;
    checkMeal(meals, UserId, next)
      .then((check) => {
        if (check) {
          db.Menu.findOrCreate({
            where: { postOn },
            defaults: { UserId }
          })
            .then((menu) => {
              if (menu[1] === true) {
                menu[0].addMeals(meals, {
                  through: {
                    mealOwner: UserId
                  }
                })
                  .then(() => {
                    res.status(201).send({
                      success: true,
                      message: 'Menu posted successfully!',
                      menu: menu[0]
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
   * Adds meal to existing Menu
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static addMealToMenu(req, res, next) {
    const { meals: newMeals } = req.body;
    const { id: UserId } = req.user;
    const { menuId } = req.params;

    checkMeal(newMeals, UserId, next)
      .then((checked) => {
        if (checked) {
          db.Menu.findOne({
            where: { id: menuId },
            attributes: ['id', 'postOn']
          })
            .then((menu) => {
              if (menu !== null) {
                // check if menu can still be updated
                if (expire(menu.postOn)) {
                  const err = new Error('Can\'t modify menu anymore!');
                  err.status = 405;
                  throw err;
                }

                db.MenuMeal.destroy({ // remove only the caterer's meals
                  where: {
                    MenuId: menu.id,
                    MealId: newMeals,
                    mealOwner: UserId
                  }
                });

                newMeals.forEach((mealId) => {
                  db.MenuMeal.create({
                    MenuId: menu.id,
                    MealId: mealId,
                    mealOwner: UserId
                  })
                    .catch(err => next(err));
                });

                res.status(200).send({
                  success: true,
                  message: 'Meals added to menu successfully!',
                });
              } else {
                const err = new Error('Menu not found!');
                err.status = 404;
                throw err;
              }
            })
            .catch(err => next(err));
        }
      });
  }

  /**
   * Removes meals in a menu
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MenusController
   */
  static deleteMealInMenu(req, res, next) {
    const { meals } = req.body;
    const { menuId } = req.params;
    const { id: UserId } = req.user;

    checkMeal(meals, UserId, next)
      .then((check) => {
        if (check === true) {
          db.Menu.findOne({
            where: { id: menuId },
            attributes: ['id', 'postOn']
          })
            .then((menu) => {
              if (menu !== null) {
                // check if menu can still be updated
                if (expire(menu.postOn)) {
                  const err = new Error('Can\'t modify menu anymore!');
                  err.status = 405;
                  throw err;
                }

                db.MenuMeal.destroy({
                  where: {
                    MenuId: menuId,
                    MealId: meals,
                    mealOwner: UserId
                  }
                })
                  .catch(err => next(err));

                res.status(200).send({
                  success: true,
                  message: 'Meal removed from menu successfully!',
                });
              }

              if (menu === null) {
                const err = new Error('Menu not found!');
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
