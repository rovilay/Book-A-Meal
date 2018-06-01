export const addMealToCart = ({
  id,
  price,
  portion
}) => ({
  type: 'ADD_MEAL_TO_CART',
  meal: {
    id,
    price,
    portion
  }
});

export const deleteMealInCart = ({ id }) => ({
  type: 'DELETE_MEAL_IN_CART',
  mealId: id
});
