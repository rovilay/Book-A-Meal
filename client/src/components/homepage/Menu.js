import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MealCard from '../common/MealCard';

class Menu extends Component {
  render() {
    const { menu, onAddMealToCart } = this.props;
    return (
      <div className="menu-container">
        <div className="menu-title" id="menu-title">
          Todays Menus
        </div>
        <div className="boxes" id="menu-display">
          {menu.map((meal, i) => <MealCard key={i} mealData={meal} onSubmit={onAddMealToCart} />)}
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
  onAddMealToCart: PropTypes.func.isRequired
};

export default Menu;

