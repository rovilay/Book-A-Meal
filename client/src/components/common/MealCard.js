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
      notify();
    } else {
      history.push('/login');
    }

    e.preventDefault();
  }

  render() {
    const { mealData, user } = this.props;
    return (
      <div className="menu-box">
        <img src={mealData.image} alt="menu02" />
        <form className="menu-info" onSubmit={this.onSubmit}>
          <h4>
            {mealData.title}
          </h4>
          <p className="bold">Price (&#8358;):
            <span> {mealData.price}</span>
          </p>
          <p>{mealData.description}</p>
          {
            (!user.admin)
            &&
            (
              <span>
                <p className="bold">
                  Portion: &nbsp;<input
                    type="number"
                    min="1"
                    id="portion"
                    className="portion"
                    name="portion"
                    onChange={this.onChange}
                    required
                  />
                </p>
                <p>
                  <input
                    type="submit"
                    id="order"
                    className="order"
                    value="order"
                  />
                </p>
              </span>
            )
          }
        </form>
      </div>
    );
  }
}

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addMealToCart: PropTypes.func.isRequired
};

export default MealCard;

