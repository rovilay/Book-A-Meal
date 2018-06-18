import React, { Component } from 'react';
import PropTypes from 'prop-types';

import navData from '../../../helpers/navData';

class AddMeal extends Component {
  componentDidMount() {
    this.props.setNav(navData.adminNav);
  }

  render() {
    return (
      <div>
        meal page
      </div>
    );
  }
}

AddMeal.propTypes = {
  setNav: PropTypes.func.isRequired
};

export default AddMeal;
