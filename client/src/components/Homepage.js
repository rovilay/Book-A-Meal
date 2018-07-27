import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { setDefaultNav } from '../actions/navLinksAction';
import getTodayMenu from '../actions/menuAction';
import Menu from './common/Menu';

class HomePage extends Component {
  componentDidMount() {
    this.props.setDefaultNav();
    this.props.getTodayMenu();

    this.addMealToCart = this.addMealToCart.bind(this);
  }

  addMealToCart() {
    this.props.history.push('/login');
  }

  render() {
    const { menu } = this.props;
    return (
      <main>
        <section className="first-section">
          <div className="showcase">
            <p className="merienda"> Meals that perfectly <br />fits your lifestyle</p>
            <a
              role="button"
              href="#menu"
              className="view-menu-btn"
            >
              View menu
            </a>
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
                className="btn-1"
                onClick={() => {
                  this.props.history.push('/login');
                }}
              >
                Login
              </button>
              <button
                className="btn-1"
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
        (menu.length > 0)
        &&
        <Menu
          menu={menu}
          addMealToCart={this.addMealToCart}
          notify={this.notify}
          {...this.props}
        />
      }
      </main>
    );
  }
}

HomePage.propTypes = {
  menu: PropTypes.array.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  setDefaultNav: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login.user,
  menu: state.todayMenu.Meals
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setDefaultNav,
    getTodayMenu,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
