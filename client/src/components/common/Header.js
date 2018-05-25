import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header">
          <a href="index.html" className="logo">Book-A-Meal</a>
          <div className="header-right">
            {this.props.navData.map((nav, i) => <a href={nav.link} key={i}>{nav.title}</a>)}
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
