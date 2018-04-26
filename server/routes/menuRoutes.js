import express from 'express';
import menusController from '../controller/menus';

const menuRouter = express.Router();

menuRouter.get('/api/v1/menus', menusController.getAllMenus);
menuRouter.get('/api/v1/menus/:DD/:MM/:YYYY', menusController.getMenu);


export default menuRouter;