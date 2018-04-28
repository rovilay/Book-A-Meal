/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllMenus", "getMenu", "postMenu"] }] */

import meals from '../model/mealsdb';
import menus from '../model/menudb';

class MenusController {
  getAllMenus(req, res) {
    menus.forEach(menu => {
        for (let i = 0; i < menu.meals.length; i += 1) {
          meals.map(meal => {
            if (meal.id === menu.meals[i]) {
              menu.meals[i] = meal;
            }
            return undefined;
          });

          if(parseInt(menu.meals[i], 10)) {
            menu.meals[i] = 
            `meal id ${menu.meals[i]} not in database`;
          }
        }
      
    });

    return res.status(200).send({
      success: 'true',
      message: 'Menus retrieved successfully',
      menus
    });
  }

  getMenu(req, res) {
  
    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${day}/${month}/${year}`;
    let reqMenu;
    menus.forEach(menu => {
      if (menu.date === date) {
        for (let i = 0; i < menu.meals.length; i += 1) {
          meals.forEach(meal => {
            if (meal.id === menu.meals[i]) {
              menu.meals[i] = meal;
            } 

            if(parseInt(menu.meals[i], 10)) {
              const id = menu.meals[i];
              menu.meals[i] = 
              `meal id ${id} not in database`;
            }
          });
        }

        reqMenu = menu;
      }
    });

    return res.status(200).send({
      success: 'true',
      message: 'Menu retrieved successfully',
      menu: reqMenu
    });
  }

  postMenu(req, res) {
    if (!req.body.date) {
      return res.status(400).send({
        success: 'false',
        message: 'date is empty'
      });
    } else if (!req.body.meals || req.body.meals.length === 0) {
      return res.status(400).send({
        success: 'false',
        message: 'meals are empty'
      });
    }
    // obj to input to the db
    const menu = {
      id: parseInt(menus[menus.length - 1].id, 10) + 1,
      date: req.body.date,
      meals: req.body.meals
    };

    // push menu to db
    menus.push(menu);

    return res.status(201).send({
      success: 'true',
      message: 'Menu added successfully',
      menus
    });
  }
}

const menusController = new MenusController();
export default menusController;