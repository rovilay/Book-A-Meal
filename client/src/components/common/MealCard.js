import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/mealCard.css';
import isExpired from '../../helpers/isExpired';

class MealCard extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: parseInt(value.trim(), 10) });
  }

  onSubmit() {
    const {
      mealData,
      history,
      notify,
      user,
      addMealToCart
    } = this.props;

    if (user && !isExpired(user.expire) && !user.admin) {
      addMealToCart({ ...mealData });
      if (notify) {
        notify();
      }
    } else {
      history.push('/login');
    }

    // e.preventDefault();
  }

  render() {
    const { mealData, user } = this.props;
    return (
      <div className="mealCard-container">
        <img className="meal-img" src={mealData.image} alt={mealData.title} />
        <div className="overlay">
          <div className="meal-desc">{mealData.description}</div>
          {
            (!user.admin)
            &&
            <button onClick={this.onSubmit}>Order</button>
          }
        </div>

        <div className="meal-label">
          <span className="meal-title">{mealData.title}</span>
          <span className="meal-price">&#8358; {mealData.price}</span>
        </div>
        <div className="mobile-label">
          <span className="meal-title">{mealData.title}</span>
          <span className="meal-price">&#8358; {mealData.price}</span>
          <div className="meal-desc">{mealData.description}</div>
          <button className="mob-btn" onClick={this.onSubmit}>Order</button>
        </div>
      </div>
    );
  }
}

MealCard.defaultProps = {
  notify: undefined,
};

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  notify: PropTypes.func,
  user: PropTypes.object.isRequired,
  addMealToCart: PropTypes.func.isRequired
};

export default MealCard;
