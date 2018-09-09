/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MonthFilter } from '../../helpers/tableHeadData';

class FilterComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      date: '',
      month: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.setFilter({ ...this.state });
  }

  render() {
    return (
      <div className="filter">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="filter" className="label">Filter By:</label>
          <div className="input-div">
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
          </div>
          {
            (this.state.filter === 'date')
            &&
            <div className="input-div inner-select">
              <input
                type="date"
                name="date"
                id="filter-date"
                required
                onChange={(e) => {
                  this.setState({ month: '', [e.target.name]: e.target.value });
                }}
              />
            </div>
          }

          {
            (this.state.filter === 'month')
            &&
            <div className="input-div inner-select">
              <select
                name="month"
                id="month"
                required
                onChange={(e) => {
                  this.setState({ date: '', [e.target.name]: e.target.value });
                }}
              >
                <option value="">select month</option>
                {
                  MonthFilter.map((month, i) => (
                    <option
                      key={i}
                      value={month}
                    >
                      {month}
                    </option>
                  ))
                }
              </select>
            </div>
          }

          <button
            type="submit"
            value="Search"
            className="btn-2 filter-btn"
          >
            Filter
          </button>
        </form>
      </div>
    );
  }
}

FilterComp.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterComp;
