
import express from 'express';
import mealRouter from './routes/mealRoutes';
import bodyParser from 'body-parser';
import menuRouter from './routes/menuRoutes';

const app = express();
const PORT = 3000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(mealRouter);
app.use(menuRouter);


app.listen(PORT, () => {
  console.log(`Sever is running at port ${PORT}`);
});

export default app;






