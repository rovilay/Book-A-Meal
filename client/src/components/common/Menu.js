import React from 'react';
import PropTypes from 'prop-types';

import MealCard from './MealCard';

const Menu = (props) => {
  const { menu } = props;
  return (
    <div className="menu">
      {
        (menu.length > 0)
        &&
        <h1 className="menu-title" id="menu-title">
          Menu
        </h1>
      }
      {
        (menu.length > 0)
        ?
          <div className="menu-container" id="">
            {
              menu.map(meal => (
                <MealCard
                  key={meal.id}
                  mealData={meal}
                  {...props}
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

