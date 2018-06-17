/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import MealCheckBoxCard from './mealCheckbox';

const SetMenuForm = props => (
  <form className="setmenu-form" onSubmit={props.submitNewMenu}>
    <p className="date full">
      <label htmlFor="date">Post on:</label>
      <input
        type="date"
        placeholder="DD / MM / YYYY"
        name="menu-date"
        id="postOn"
        required
      />
    </p>
    <hr />
    <MealCheckBoxCard {...props} />
    <hr />
    <p>
      <button
        type="submit"
        name="addbtn"
        id="addbtn"
        className="addBtn"
        disabled={props.newMenuMeals.length <= 0}
      >
        Add Menu
      </button>
    </p>
  </form>
);

SetMenuForm.propTypes = {
  submitNewMenu: PropTypes.func.isRequired,
  newMenuMeals: PropTypes.array.isRequired
};

export default SetMenuForm;
