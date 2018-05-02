/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllMenus", "getMenu", "postMenu"] }] */

import meals from '../model/mealsdb';
import menus from '../model/menudb';

class MenusController {
  static getAllMenus(req, res) {
    let i = 1;
    console.log(menus);
    const menuss = [...menus];
    console.log(i+=1);
    console.log(menus);
    menuss.forEach(menu => {
      const menuMeals = [...menu.meals];
        
      const foundMeals = meals.filter(meal => menuMeals.includes(meal.id));
      menu.meals = foundMeals;  
    });

    return res.status(200).send({
      success: true,
      message: 'Menus retrieved successfully',
      menus: menuss
    });
  }

  static getMenu(req, res) {
  
    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${day}/${month}/${year}`;
    
    const reqMenu = menus.find(menu => menu.date === date);
    console.log(reqMenu);
    const menuMeals = [...reqMenu.meals];
    console.log(menuMeals);
    const foundMeals = meals.filter(meal => menuMeals.includes(meal.id));
    console.log(foundMeals)
    reqMenu.meals = [...foundMeals];  
    console.log(reqMenu.meals);
    
    return res.status(200).send({
      success: 'true',
      message: 'Menu retrieved successfully',
      menu: reqMenu
    });
  }

  static postMenu(req, res) {
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

export default MenusController;