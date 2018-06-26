/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import tableHead from '../../helpers/tableHead';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      date: '',
      month: ''
    };
  }
  render() {
    return (
      <div className="filter">
        <form onSubmit={(e) => {
            e.preventDefault();
            console.log(this.state);
          }}
        >
          <label htmlFor="filter" className="label">Filter By:</label>
          <select
            name="filter"
            id="filter"
            onChange={(e) => {
              this.setState({ [e.target.name]: e.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="date">Date</option>
            <option value="month">Month</option>
          </select>
          <input
            type="date"
            name="date"
            id="filter-date"
            onChange={(e) => {
              this.setState({ [e.target.name]: e.target.value });
            }}
          />
          <select
            name="month"
            id="month"
            onChange={(e) => {
              this.setState({ [e.target.name]: e.target.value });
            }}
          >
            <option value="">select month</option>
            {
              tableHead.MonthFilter.map((month, i) => (
                <option
                  key={i}
                  value={month}
                >
                  {month}
                </option>
              ))
            }
          </select>
          <button type="submit" value="Search" className="submit"> submit </button>
        </form>
      </div>
    );
  }
}

export default Filter;
