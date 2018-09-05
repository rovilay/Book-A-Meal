/* eslint no-console: off */

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import mealsRoutes from './routes/mealsRoutes';
import menusRoutes from './routes/menusRoutes';
import ordersRoutes from './routes/ordersRoutes';
import usersRoutes from './routes/usersRoutes';
import errorHandler from './middlewares/errorHandler';
import swaggerDoc from '../swagger.json';


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

app.get(express.static(path.join(__dirname, '/client/public')));
// Swagger docs routes
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/public')));
}

app.use(usersRoutes);
app.use(menusRoutes);
app.use(mealsRoutes);
app.use(ordersRoutes);
app.use(errorHandler);

// Serve client pages
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../client/public/index.html')));
}


app.listen(port, () => {
  console.log(`Sever is running at port ${port}`);
});

export default app;
