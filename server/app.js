
import express from 'express';
import bodyParser from 'body-parser';
import mealRouter from './routes/mealRoutes';
import menuRouter from './routes/menuRoutes';
import ordersRouter from './routes/ordersRoutes';
import usersRouter from './routes/usersRoutes';
import authorize from './middlewares/authenticate';


require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book A Meal!' });
});
app.use(usersRouter);

app.use(authorize);
app.use(mealRouter);
app.use(menuRouter);
app.use(ordersRouter);


app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});

export default app;

