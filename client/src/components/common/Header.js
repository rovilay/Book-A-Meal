import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { navLinks } = props;
  return (
    <header>
      <div className="header">
        <NavLink to="/" className="logo" exact >Book-A-Meal</NavLink>
        <div className="header-right">
          {navLinks &&
            navLinks.map((nav, i) => (
              <NavLink
                to={nav.link}
                key={i}
                className="is-active"
              >
                {nav.title}
              </NavLink>
            ))}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  navLinks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  navLinks: state.navLinks
});

export default connect(mapStateToProps)(Header);
