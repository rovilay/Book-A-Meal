/* eslint no-console: off */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import mealRouter from './routes/mealRoutes';
import menuRouter from './routes/menuRoutes';
import ordersRouter from './routes/ordersRoutes';
import usersRouter from './routes/usersRoutes';
import myErrorHandler from './middlewares/errorHandler';
import swaggerDoc from './helpers/swagger.json';


require('dotenv').config(); //

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: 'http://localhost:9000',
  optionSuccessStatus: 200
};

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.options('*', cors(corsOption));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Book-A-Meal!' });
});

// Swagger docs routes
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(usersRouter);

// app.use(authorize);
app.use(menuRouter);
app.use(mealRouter);
app.use(ordersRouter);
app.use(myErrorHandler);


app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});

export default app;

