import express from 'express';
import MenusController from '../controller/MenusController';
import adminOnly from '../middlewares/adminOnly';
import authorize from '../middlewares/authorize';
import validateQuery from '../middlewares/validate/validateQuery';
import {
  validateMenu,
  validateAddMealToMenu,
  validateParams,
} from '../middlewares/validate/menus';

const menusRoutes = express.Router();

menusRoutes.get('/api/v1/menus/today', validateQuery, MenusController.getTodayMenu);

menusRoutes.use('/api/v1/menus', authorize);
menusRoutes.get('/api/v1/menus', adminOnly, validateQuery, MenusController.getAllMenus);
menusRoutes.get('/api/v1/menus/:menuId/meals', adminOnly, validateParams, validateQuery, MenusController.getMenuMeals);
menusRoutes.post('/api/v1/menus', adminOnly, validateMenu, validateAddMealToMenu, MenusController.createMenu);
menusRoutes.post('/api/v1/menus/:menuId/meals', adminOnly, validateParams, validateAddMealToMenu, MenusController.addMealToMenu);
menusRoutes.delete('/api/v1/menus/:menuId/meals', adminOnly, validateParams, MenusController.deleteMealInMenu);

export default menusRoutes;
