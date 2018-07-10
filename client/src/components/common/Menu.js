import React from 'react';
import PropTypes from 'prop-types';

import MealCard from './MealCard';
import '../../assets/css/mealCard.css';

const Menu = (props) => {
  const { menu } = props;
  return (
    <section className="menu">
      {
        (menu.length > 0)
        &&
        <div className="title" id="title">
          {"Today's Menu"}
        </div>
      }
      {
        (menu.length > 0)
          ?
            <div className="menu-container">
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
    </section>
  );
};

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default Menu;
