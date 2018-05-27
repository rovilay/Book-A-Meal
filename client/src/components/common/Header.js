import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header">
          <Link to="/" className="logo">Book-A-Meal</Link>
          <div className="header-right">
            {this.props.navData.map((nav, i) => <Link to={nav.link} key={i}>{nav.title}</Link>)}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  navData: PropTypes.array.isRequired
};

export default Header;
