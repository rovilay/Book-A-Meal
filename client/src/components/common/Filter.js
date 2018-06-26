/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import tableHead from '../../helpers/tableHead';
import filterAction from '../../actions/filter';

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
            this.props.filterAction('caterer_meals', { ...this.state });
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
          {
            (this.state.filter === 'date')
            &&
            <input
              type="date"
              name="date"
              id="filter-date"
              required
              onChange={(e) => {
                this.setState({ [e.target.name]: e.target.value });
              }}
            />
          }

          {
            (this.state.filter === 'month')
            &&
            <select
              name="month"
              id="month"
              required
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
          }

          <button type="submit" value="Search" className="submit"> Filter </button>
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  filterAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    filterAction
  },
  dispatch
);

export default connect('', mapDispatchToProps)(Filter);
