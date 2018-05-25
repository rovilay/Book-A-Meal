import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealCard extends Component {
  render() {
    return (
      <div className="menu-box">
        <img src={this.props.mealData.image} alt="menu02" />
        <form className="menu-info">
          <h2>
            {this.props.mealData.title}
          </h2>
          <p className="bold">Price (&#8358;):
            <span> {this.props.mealData.price}</span>
          </p>
          <p>{this.props.mealData.description}</p>
          <p className="bold">
              Portion: &nbsp;<input type="number" min="1" id="Qty" className="Qty" />
          </p>
          <p>
            <input type="submit" id="order" className="order" value="order" />
          </p>
        </form>
      </div>
    );
  }
}

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired
};

export default MealCard;

