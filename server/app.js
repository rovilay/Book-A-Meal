
import express from 'express';
import bodyParser from 'body-parser';
import mealRouter from './routes/mealRoutes';
import menuRouter from './routes/menuRoutes';
import ordersRouter from './routes/ordersRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(mealRouter);
app.use(menuRouter);
app.use(ordersRouter);


app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});

export default app;



