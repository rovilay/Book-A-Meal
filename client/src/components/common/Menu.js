import React from 'react';
import PropTypes from 'prop-types';

import MealCard from './MealCard';
import '../../assets/css/mealCard.css';

const Menu = (props) => {
  const { menu } = props;
  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> d49f2b57ebed161ee85a43f5828ca57edba505e1
      }
    </section>
  );
};

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default Menu;
