import React from 'react';
import PropTypes from 'prop-types';

import MealCard from '../common/MealCard';

const Menu = props => (
  <div className="menu-container">
    {
      (props.menu.length > 0)
      &&
      <div className="menu-title" id="menu-title">
        Todays Menus
      </div>
    }
    <div className="boxes" id="menu-display">
      {
        props.menu.map((meal, i) => (<MealCard
          key={i}
          mealData={meal}
          onSubmit={props.onAddMealToCart}
        />))
      }
    </div>
  </div>
);

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
  onAddMealToCart: PropTypes.func.isRequired
};

export default Menu;

