import express from 'express';
import ordersController from '../controller/orders';
import validateOrder from '../middlewares/validate/orders';
import validateQuery from '../middlewares/validate/query';
import checkTime from '../middlewares/checktime';
import authorize from '../middlewares/authenticate';
import customerOnly from '../middlewares/customerOnly';

const ordersRouter = express.Router();

ordersRouter.use('/api/v1/orders', authorize);
ordersRouter.get('/api/v1/orders', validateQuery, ordersController.getAllOrders);
ordersRouter.get('/api/v1/orders/:orderId/meals', validateQuery, ordersController.getOrderMeals);
ordersRouter.post('/api/v1/orders', customerOnly, checkTime.canOrder, validateOrder, ordersController.postOrder);
ordersRouter.put('/api/v1/orders/:orderId', customerOnly, checkTime.canUpdate, validateOrder, ordersController.updateOrder);
ordersRouter.delete('/api/v1/orders/:orderId', customerOnly, checkTime.canUpdate, ordersController.deleteOrder);

export default ordersRouter;
