import express from 'express';
import menusController from '../controller/menus';
import adminOnly from '../middlewares/adminOnly';
import authorize from '../middlewares/authenticate';
import validateQuery from '../middlewares/validate/query';
import {
  validateMenu,
  validateUpdateMenu,
  validateParams,
} from '../middlewares/validate/menus';

const menuRouter = express.Router();

menuRouter.get('/api/v1/menus/:DD/:MM/:YYYY', menusController.getMenuByDate);

menuRouter.use('/api/v1/menus', authorize);
menuRouter.get('/api/v1/menus', adminOnly, validateQuery, menusController.getAllMenus);
menuRouter.post('/api/v1/menus', adminOnly, validateMenu, menusController.postMenu);
menuRouter.put('/api/v1/menus/:DD/:MM/:YYYY', adminOnly, validateQuery, validateParams, validateUpdateMenu, menusController.updateMenu);

export default menuRouter;
