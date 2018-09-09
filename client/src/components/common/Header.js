/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint class-methods-use-this: 0 */
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classname from 'classnames';

import { emptyCart } from '../../actions/cartActions';
import { setDefaultNav } from '../../actions/navLinksActions';
import { logOutUser } from '../../actions/loginActions';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.onLogOut = this.onLogOut.bind(this);
    this.toggleHam = this.toggleHam.bind(this);
  }

  onLogOut() {
    this.props.emptyCart();
    this.props.setDefaultNav();
    this.props.logOutUser();
    this.props.history.push('/');
  }


  toggleHam() {
    const nav = document.getElementById('nav-menu');
    if (nav && nav.className === 'nav-menu') {
      nav.className = 'nav-menu responsive';
    } else if (nav && nav.className === 'nav-menu responsive') {
      nav.className = 'nav-menu';
    }
  }

  render() {
    const {
      navLinks,
      cart
    } = this.props;

    return (
      <header className="header">
        <NavLink to="/" className="logo" exact>Book-A-Meal</NavLink>
        <a
          className="ham"
          onClick={this.toggleHam}
        >
          <FontAwesome
            id="mobile-menu"
            name="bars"
          />
        </a>
        <div className="nav-menu" id="nav-menu">
          {navLinks &&
            navLinks.map((nav, i) => {
              if (nav.title === 'Cart') {
                return (
                  <NavLink
                    to={nav.link}
                    key={i}
                    className="is-active nav-link"
                  >
                    <FontAwesome
                      name="cart-plus"
                    />
                    <span
                      className={
                        classname('', { 'cart-count': cart.length > 0 })
                      }
                    >
                      ({cart.length})
                    </span>
                  </NavLink>
                );
              }

              if (nav.title === 'Log Out') {
                return (
                  <a
                    className= "is-active nav-link"
                    onClick={this.onLogOut}
                    key={i}
                  >
                    {nav.title}
                  </a>
                );
              }

              return (
                <NavLink
                  to={nav.link}
                  key={i}
                  className="is-active nav-link"
                >
                  {nav.title}
                </NavLink>
              );
            })
          }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  navLinks: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  emptyCart: PropTypes.func.isRequired,
  setDefaultNav: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired

};

export const mapStateToProps = state => ({
  navLinks: state.navLinks,
  cart: state.cart.meals
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    emptyCart,
    setDefaultNav,
    logOutUser
  },
  dispatch
);

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(Header));
