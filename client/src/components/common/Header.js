/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import classname from 'classnames';

import { delFromLs } from '../../helpers/Ls';
import { emptyCart } from '../../actions/cart';
import { setDefaultNav } from '../../actions/navLinks';
import { logOutUser } from '../../actions/login';

const Header = (props) => {
  const { navLinks, history, dispatch } = props;

  const onLogOut = () => {
    delFromLs('jwt');
    dispatch(emptyCart());
    dispatch(setDefaultNav());
    dispatch(logOutUser());
    history.push('/');
  };

  const toggleHam = () => {
    const nav = document.getElementById('nav-menu');
    // const mobileMenu = document.getElementById('mobile-menu');
    (nav.className === 'nav-menu')
      ?
      (
        nav.className += ' responsive'
      )
      :
      (
        nav.className = 'nav-menu'
      );
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo" exact>Book-A-Meal</NavLink>
      <a
        className="ham"
        onClick={() => {
          toggleHam();
        }}
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
                  <span className={classname('', { 'cart-count': props.cart.length > 0 })}>({props.cart.length})</span>
                </NavLink>
              );
            }

            if (nav.title === 'Log Out') {
              return (
                <a
                  className= "is-active nav-link"
                  onClick={onLogOut}
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
};

Header.propTypes = {
  navLinks: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  navLinks: state.navLinks,
  cart: state.cart
});

export default connect(mapStateToProps)(withRouter(Header));
