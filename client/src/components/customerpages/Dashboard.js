/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import navData from '../../helpers/navData';
import Menu from '../common/Menu';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentWillMount() {
    const { history, token } = this.props;
    if (!token) {
      history.push('/');
    }
  }

  componentDidMount() {
    const { getTodayMenu, setNav } = this.props;
    setNav(navData.customerNav);
    getTodayMenu({});
  }


  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const {
      limit
    } = this.props.pagination;

    const nextOffset = (data.selected) * limit;
    this.props.getTodayMenu({ limit, offset: nextOffset });
  }


  render() {
    const { user, todayMenu, pagination } = this.props;
    const {
      count,
      numOfPages,
    } = pagination;
    const { firstName, lastName } = user;
    return (
      <div className="customer-page">
        <div className="welcome">
          <p className="merienda">
            Welcome, {firstName} {lastName}
          </p>
        </div>
        <div>
          <Menu
            menu={todayMenu}
            {...this.props}
          />
        </div>
        {
            (count > 12)
            &&
            <div className="pagination-container">
              <ReactPaginate
                previousLabel="<<"
                nextLabel=">>"
                breakLabel={<a href="">...</a>}
                breakClassName="break-me"
                pageCount={numOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePaginationClick}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            </div>
      }
      </div>
    );
  }
}

CustomerDashboard.propTypes = {
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  todayMenu: PropTypes.array.isRequired,
  setNav: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
};

export default CustomerDashboard;
