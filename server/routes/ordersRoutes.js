import express from 'express';
import OrdersController from '../controller/OrdersController';
import validateOrder from '../middlewares/validate/validateOrder';
import validateQuery from '../middlewares/validate/validateQuery';
import CheckTime from '../middlewares/checktime';
import authorize from '../middlewares/authorize';
import customerOnly from '../middlewares/customerOnly';

const ordersRoutes = express.Router();

ordersRoutes.use('/api/v1/orders', authorize);
ordersRoutes.get('/api/v1/orders', validateQuery, OrdersController.getAllOrders);
ordersRoutes.get('/api/v1/orders/:orderId/meals', validateQuery, OrdersController.getOrderMeals);
ordersRoutes.post('/api/v1/orders', customerOnly, CheckTime.canOrder, validateOrder, OrdersController.postOrder);
ordersRoutes.put('/api/v1/orders/:orderId', customerOnly, CheckTime.canUpdate, validateOrder, OrdersController.updateOrder);
ordersRoutes.delete('/api/v1/orders/:orderId', customerOnly, CheckTime.canUpdate, OrdersController.deleteOrder);

export default ordersRoutes;
