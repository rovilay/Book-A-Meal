import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setNavLinks from '../../actions/navLinks';


class MenuPage extends Component {
  componentDidMount() {
    this.props.dispatch(setNavLinks(this.props.navLinks));
  }
  render() {
    return (
      <div>
        Menu Page!
      </div>
    );
  }
}

MenuPage.defaultProps = {
  navLinks: [
    {
      title: 'Meal',
      link: '/menu'
    }
  ]
};

MenuPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.object)
};

export default connect()(MenuPage);
