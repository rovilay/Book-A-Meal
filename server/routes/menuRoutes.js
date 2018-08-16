import express from 'express';
import menusController from '../controller/menus';
import adminOnly from '../middlewares/adminOnly';
import authorize from '../middlewares/authenticate';
import validateQuery from '../middlewares/validate/query';
import {
  validateMenu,
  validateAddMealToMenu,
  validateParams,
} from '../middlewares/validate/menus';

const menuRouter = express.Router();

menuRouter.get('/api/v1/menus/today', validateQuery, menusController.getTodayMenu);

menuRouter.use('/api/v1/menus', authorize);
menuRouter.get('/api/v1/menus', adminOnly, validateQuery, menusController.getAllMenus);
menuRouter.get('/api/v1/menus/:menuId/meals', adminOnly, validateParams, validateQuery, menusController.getMenuMeals);
menuRouter.post('/api/v1/menus', adminOnly, validateMenu, validateAddMealToMenu, menusController.postMenu);
menuRouter.post('/api/v1/menus/:menuId/meals', adminOnly, validateParams, validateAddMealToMenu, menusController.addMealToMenu);
menuRouter.delete('/api/v1/menus/:menuId/meals', adminOnly, validateParams, menusController.deleteMealInMenu);

export default menuRouter;
