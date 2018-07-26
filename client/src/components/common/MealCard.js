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
  }

  render() {
    const { mealData, user } = this.props;
    return (
<<<<<<< HEAD
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
          <span className="meal-price">&#8358;{mealData.price}</span>
          <div className="meal-desc">{mealData.description}</div>
          <button className="mob-btn" onClick={this.onSubmit}>Order</button>
=======
      <div className="meal-card">
        <div className="imgbox">
          <img src={mealData.image} alt={mealData.title} />
        </div>
        <div className="meal-details">
          <div className="meal-info">
            <h2>
              {mealData.title}
            </h2>
            <span>{mealData.description}</span>
          </div>
          <div className="price">&#8358; {mealData.price}</div>
          <form className="meal-order" onSubmit={this.onSubmit}>
            {
              (!user.admin)
              &&
              (

                <span>
                  Portion: &nbsp;<input
                    type="number"
                    min="1"
                    id="portion"
                    className="portion"
                    name="portion"
                    onChange={this.onChange}
                    required
                  />
                </span>
              )
            }
            <br />
            {
              (!user.admin)
              &&
              (
                <input
                  type="submit"
                  id="order"
                  className="order"
                  value="order"
                />
              )
            }
          </form>
>>>>>>> d49f2b57ebed161ee85a43f5828ca57edba505e1
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
