export const addMealToCart = ({
  id,
  title,
  price: unitPrice,
  portion
}) => ({
  type: 'ADD_MEAL_TO_CART',
  meal: {
    id,
    title,
    unitPrice,
    portion
  }
});

export const deleteMealInCart = ({ id }) => ({
  type: 'DELETE_MEAL_IN_CART',
  mealId: id
});

export const emptyCart = () => ({
  type: 'EMPTY_CART',
});

