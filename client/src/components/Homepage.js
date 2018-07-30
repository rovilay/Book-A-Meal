import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { setDefaultNav } from '../actions/navLinksActions';
import { getTodayMenu } from '../actions/menuActions';
import { addToCart } from '../actions/cartActions';
import Menu from './common/Menu';

class HomePage extends Component {
  componentDidMount() {
    this.props.setDefaultNav();
    this.props.getTodayMenu();
  }

  render() {
    const { todayMenu } = this.props;
    return (
      <main>
        <section className="first-section">
          <div className="showcase">
            <p className="merienda"> Meals that perfectly <br />fits your lifestyle</p>
            {
              (todayMenu.length !== 0)
              &&
              <a
                role="button"
                href="#menu"
                className="view-menu-btn"
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
        (todayMenu.length > 0)
        &&
        <Menu
          menu={todayMenu}
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
  todayMenu: PropTypes.array.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  setDefaultNav: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login.user,
  todayMenu: state.menu.todayMenu,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setDefaultNav,
    getTodayMenu,
    addToCart
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
