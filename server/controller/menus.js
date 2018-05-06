/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllMenus", "getMenu", "postMenu"] }] */

import db from '../../models/index';

class MenusController {
  static getAllMenus(req, res) {
    db.Menu.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName']
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id']
        }
      }]
    })
    .then(menu => res.status(200).send({
        success: true,
        message: 'Menus retrieved successfully',
        menus: menu
      })
    )
    .catch(err => res.status(400).send(err)
    );

  }

  static getMenu(req, res) {

    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${year}-${month}-${day}`;
   
    db.Menu.findAll( {
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName']
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id']
        }
      }],
      where: {
          postOn: date
        }
    })
    .then(menu => res.status(200).send({
        success: true,
        message: 'Menu retrieved successfully',
        menu
      })
    )
    .catch(err => res.status(400).send(err)
    );
  }

  static postMenu(req, res) {
    const newMenu = req.body;
    newMenu.meals = JSON.parse(newMenu.meals);
    db.Menu.create({
        UserId: req.userData.user.id,
        postOn: newMenu.postOn
      })
      .then(menu => {
        menu.addMeals(newMenu.meals);
        res.status(200).send({
          success: true,
          message: 'Menu posted successfully!'
        });
      })
      .catch(err => {
        res.send(err);
      });
  }
}

export default MenusController;