/* eslint jsx-a11y/label-has-for: 0 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import MealCheckBoxCard from './mealCheckbox';

class SetMenuForm extends Component {
  render() {
    return (
      <form className="setmenu-form">
        <p className="date full">
          <label htmlFor="date">Post on:</label>
          <input type="date" placeholder="DD / MM / YYYY" name="menu-date" id="date" required />
        </p>
        <hr />
        <MealCheckBoxCard {...this.props} />
        <hr />
        <p className="submit full">
          <button
            type="submit"
            name="addbtn"
            id="addbtn"
            className="btn-1"
          >
            Add Menu
          </button>
        </p>
      </form>
    );
  }
}

export default SetMenuForm;
