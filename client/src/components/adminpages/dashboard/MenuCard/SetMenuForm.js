/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import MealCheckBoxCard from './MealCheckbox';

const SetMenuForm = props => (
  <form
    className="setmenu-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.submitNewMenu();
    }}
  >
    <div className="date">
      <label htmlFor="date">Post on:</label>
      <p className="input-div">
        <input
          type="date"
          placeholder="DD / MM / YYYY"
          name="menu-date"
          min={moment().format('YYYY-MM-DD')}
          max={moment().add('2', 'd').format('YYYY-MM-DD')}
          id="postOn"
          required
        />
      </p>
    </div>
    <hr />
    <MealCheckBoxCard {...props} />
    <hr />
    <p className="submit-btn">
      <button
        type="submit"
        name="addbtn"
        id="addbtn"
        className="btn-2"
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
