/* eslint react/no-unused-prop-types:0 */
import React from 'react';
import PropTypes from 'prop-types';

const MealCheckBoxCard = (props) => {
  const sortedMeals = props.meals.sort((a, b) => a.title > b.title);
  return (
    <div className="checkbox-card">
      { sortedMeals.map(meal => (
        <p key={meal.id}>
          <input
            type="checkbox"
            name="meal-check"
            className="meal-check"
            id={meal.id}
            onClick={() => {
              props.setNewMenuMeal(meal.id);
              }
            }
            value={meal.id}
          />
          {meal.title}
        </p>
      ))}
    </div>
  );
};

MealCheckBoxCard.propTypes = {
  meals: PropTypes.array.isRequired,
  setNewMenuMeal: PropTypes.func.isRequired
};

export default MealCheckBoxCard;
