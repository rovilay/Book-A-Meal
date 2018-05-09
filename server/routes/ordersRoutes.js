import express from 'express';
import ordersController from '../controller/orders';
import validateOrder from '../middlewares/validate/orders';
import checkTime from '../middlewares/checktime';

const ordersRouter = express.Router();

ordersRouter.get('/api/v1/orders', ordersController.getAllOrders);

ordersRouter.post('/api/v1/orders', checkTime.canOrder, validateOrder, ordersController.postOrder);

ordersRouter.put('/api/v1/orders/:id', checkTime.canUpdate, validateOrder, ordersController.updateOrder);

ordersRouter.delete('/api/v1/orders/:id', checkTime.canUpdate, ordersController.deleteOrder);

export default ordersRouter;
