import React from 'react';
import PropTypes from 'prop-types';

const MealCheckBoxCard = props => (
  <div className="checkbox-card">
    { props.meals.map(meal => (
      <p key={meal.id}>
        <input
          type="checkbox"
          name="meal-check"
          className="meal-check"
          id="meal"
          onClick={() => {
            props.addMealToMenu(meal.id);
            }
          }
          value={meal.id}
        />
        {meal.title}
      </p>
    ))}
  </div>
);


MealCheckBoxCard.propTypes = {
  meals: PropTypes.array.isRequired,
  addMealToMenu: PropTypes.func.isRequired
};

export default MealCheckBoxCard;
