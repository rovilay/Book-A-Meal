import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  onSubmit(e) {
    const {
      mealData,
      history,
      notify,
      user,
      addMealToCart
    } = this.props;
    const { portion } = this.state;

    if (!isExpired(user.expire) && !user.admin) {
      addMealToCart({ ...mealData, portion });
      if (notify) {
        notify();
      }
    } else {
      history.push('/login');
    }

    e.preventDefault();
  }

  render() {
    const { mealData, user } = this.props;
    return (
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
        </div>
      </div>
    );
  }
}

MealCard.defaultProps = {
  notify: undefined
};

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  notify: PropTypes.func,
  user: PropTypes.object.isRequired,
  addMealToCart: PropTypes.func.isRequired
};

export default MealCard;

