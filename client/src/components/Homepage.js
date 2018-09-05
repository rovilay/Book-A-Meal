import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactPaginate from 'react-paginate';

import { setDefaultNav } from '../actions/navLinksActions';
import { getTodayMenu } from '../actions/menuActions';
import { addToCart } from '../actions/cartActions';
import Menu from './common/Menu';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.props.setDefaultNav();
    this.props.getTodayMenu({});
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
    const { todayMenu, pagination } = this.props;
    const {
      count,
      numOfPages,
    } = pagination;

    return (
      <main className="homepage">
        <section className="first-section">
          <div className="showcase">
            <p className="merienda"> Meals that perfectly fits your lifestyle</p>
            {
              (todayMenu.length > 0)
              &&
              <a
                role="button"
                href="#menu"
                className="view-menu-btn btn-2"
              >
                View menu
              </a>
            }
          </div>
        </section>

        <section className="intro">
          <div className="intro-container">
            <h1 className="color-1">Are you busy and hungry?</h1>
            <p>
              Would you want to eat your favourite food from your favourite resturant?<br />
              Use this app to keep track of our menu and place orders at your convinience.
            </p>
            <p className="buttons">
              <button
                className="btn-2"
                onClick={() => {
                  this.props.history.push('/login');
                }}
              >
                Log in
              </button>
              <button
                className="btn-2"
                onClick={() => {
                  this.props.history.push('/signup');
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </section>

        {
        (todayMenu.length > 0)
        &&
        <Menu
          menu={todayMenu}
          addMealToCart={this.addMealToCart}
          notify={this.notify}
          {...this.props}
        />
      }

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
      </main>
    );
  }
}

HomePage.propTypes = {
  todayMenu: PropTypes.array.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  setDefaultNav: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  user: state.login.user,
  todayMenu: state.menu.todayMenu,
  pagination: state.menu.pagination
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setDefaultNav,
    getTodayMenu,
    addToCart,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
