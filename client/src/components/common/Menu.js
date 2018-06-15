import React from 'react';
import PropTypes from 'prop-types';

import MealCard from './MealCard';

const Menu = (props) => {
  const { menu } = props;
  return (
    <div className="menu-container">
      <div className="menu-title" id="menu-title">
        Menu
      </div>
      {
        (menu.length > 0)
        ?
          <div className="boxes" id="menu-display">
            {
              menu.map(meal => (
                <MealCard
                  key={meal.id}
                  mealData={meal}
                />
              ))
            }
          </div>
        :
          <div className="empty">
              Sorry No Meals Today!
          </div>
      }
    </div>
  );
};

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default Menu;

