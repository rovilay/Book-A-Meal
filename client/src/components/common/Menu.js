import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MealCard from './MealCard';

class Menu extends Component {
  render() {
    return (
      <div className="menu-container">
        <div className="menu-title" id="menu-title">
          Todays Menus
        </div>
        <div className="boxes" id="menu-display">
          {this.props.menu.map((meal, i) => <MealCard key={i} mealData={meal} />)}
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  menu: PropTypes.array
};

Menu.defaultProps = {
  menu: [
    {
      title: 'Sharwama',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Beans and Bread',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282607/menu01.jpg'
    },
    {
      title: 'Rice and Stew',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Rice and Stew',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Rice and Stew',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Rice and Stew',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    }
  ]
};

export default Menu;

