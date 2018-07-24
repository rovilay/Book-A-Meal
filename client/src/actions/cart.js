export const addMealToCart = ({
  id,
  title,
  price: unitPrice,
  portion = 1
}) => ({
  type: 'ADD_MEAL_TO_CART',
  meal: {
    id,
    title,
    unitPrice,
    portion
  }
});

export const updateCartMealPortion = ({ id, portion }) => ({
  type: 'UPDATE_CART_MEAL_PORTION',
  mealId: id,
  newPortion: portion
});

export const deleteMealInCart = id => ({
  type: 'DELETE_MEAL_IN_CART',
  mealPos: id
});

export const emptyCart = () => ({
  type: 'EMPTY_CART',
});
