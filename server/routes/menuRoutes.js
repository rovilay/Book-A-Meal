import express from 'express';
import menusController from '../controller/menus';
import adminOnly from '../middlewares/adminOnly';
import { validateMenu, validateUpdateMenu } from '../middlewares/validate/menus';

const menuRouter = express.Router();

menuRouter.get('/api/v1/menus/:DD/:MM/:YYYY', menusController.getMenu);

menuRouter.get('/api/v1/menus', adminOnly, menusController.getAllMenus);

menuRouter.post('/api/v1/menus', adminOnly, validateMenu, menusController.postMenu);

menuRouter.put('/api/v1/menus/:DD/:MM/:YYYY', adminOnly, validateUpdateMenu, menusController.updateMenu);


export default menuRouter;
