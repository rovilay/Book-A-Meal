import express from 'express';
import ordersController from '../controller/orders';

const ordersRouter = express.Router();

ordersRouter.post('/api/v1/orders', ordersController.postOrder);
ordersRouter.get('/api/v1/orders', ordersController.getAllOrders);


export default ordersRouter;