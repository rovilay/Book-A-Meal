import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import { getFromLs } from '../../helpers/Ls';
import { addMealToCart } from '../../actions/cart';
import isExpired from '../../helpers/isExpired';

class MealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      portion: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: parseInt(value.trim(), 10) });
  }

  render() {
    const { mealData, dispatch, history } = this.props;
    const { isAdmin, portion } = this.state;
    const onSubmit = (e) => {
      e.preventDefault();
      const token = getFromLs('jwt');
      if (token) {
        const {
          user,
          exp
        } = jwt.decode(token);
        if (!isExpired(exp) && !user.admin) {
          dispatch(addMealToCart({ ...mealData, portion }));
          this.setState({ isAdmin: user.admin });
        }
      } else {
        history.push('/login');
      }
    };
    return (
      <div className="menu-box">
        <img src={mealData.image} alt="menu02" />
        <form className="menu-info" onSubmit={onSubmit}>
          <h4>
            {mealData.title}
          </h4>
          <p className="bold">Price (&#8358;):
            <span> {mealData.price}</span>
          </p>
          <p>{mealData.description}</p>
          {
            (!isAdmin)
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect()(withRouter(MealCard));

