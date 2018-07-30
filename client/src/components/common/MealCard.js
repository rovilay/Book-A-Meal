import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/mealCard.css';
import { getFromLs } from '../../helpers/Ls';

const MealCard = (props) =>{
  const { mealData, addToCart } = props;
  const user = getFromLs('user');
  return (
    <div className="mealCard-container">
      <img className="meal-img" src={mealData.image} alt={mealData.title} />
      <div className="overlay">
        <div className="meal-desc">{mealData.description}</div>
        {
          (user === null || (user && !user.admin))
          &&
          <button
            onClick={
              () => {
                addToCart(mealData);
              }
            }
          >
            Order
          </button>
        }
      </div>

      <div className="meal-label">
        <span className="meal-title">{mealData.title}</span>
        <span className="meal-price">&#8358; {mealData.price}</span>
      </div>
      <div className="mobile-label">
        <span className="meal-title">{mealData.title}</span>
        <span className="meal-price">&#8358;{mealData.price}</span>
        <div className="meal-desc">{mealData.description}</div>
        <button
          className="mob-btn"
          onClick={() => {
            addToCart(mealData);
          }}
        >
          Order
        </button>
      </div>
    </div>
  );
};


MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MealCard;
