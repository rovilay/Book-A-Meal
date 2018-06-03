import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { delFromLs } from '../../helpers/Ls';
import { emptyCart } from '../../actions/cart';
import { setDefaultNav } from '../../actions/navLinks';

const Header = (props) => {
  const { navLinks, history, dispatch } = props;

  const onLogOut = () => {
    delFromLs('jwt');
    dispatch(emptyCart());
    dispatch(setDefaultNav());
    history.push('/');
  };
  return (
    <header>
      <div className="header">
        <NavLink to="/" className="logo" exact >Book-A-Meal</NavLink>
        <div className="header-right">
          {navLinks &&
            navLinks.map((nav, i) => {
              if (nav.title === 'Log Out') {
                return (
                  <button
                    className="btn"
                    onClick={onLogOut}
                    key={i}
                  >
                    {nav.title}
                  </button>
                );
              }
              if (nav.title === 'Cart(4)') {
                return (
                  <NavLink
                    to={nav.link}
                    key={i}
                    className="is-active"
                  >
                    Cart({props.cart.length})
                  </NavLink>
                );
              }
              return (
                <NavLink
                  to={nav.link}
                  key={i}
                  className="is-active"
                >
                  {nav.title}
                </NavLink>
              );
            })
          }
        </div>
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
