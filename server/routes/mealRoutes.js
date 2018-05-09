import express from 'express';
import mealController from '../controller/meals';
import validateMeal from '../middlewares/validate/meals';

import adminOnly from '../middlewares/adminOnly';

const mealRouter = express.Router();


mealRouter.get('/api/v1/meals', adminOnly, mealController.getAllMeals);
mealRouter.get('/api/v1/meals/:id', adminOnly, mealController.getMeal);
mealRouter.delete('/api/v1/meals/:id', adminOnly, mealController.deleteMeal);
mealRouter.post('/api/v1/meals', adminOnly, validateMeal, mealController.addMeal);
mealRouter.put('/api/v1/meals/:id', adminOnly, validateMeal, mealController.updateMeal);


export default mealRouter;
