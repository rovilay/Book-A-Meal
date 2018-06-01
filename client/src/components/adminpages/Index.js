import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import navData from '../../helpers/navData';
import { setNav } from '../../actions/navLinks';


class MenuPage extends Component {
  componentDidMount() {
    this.props.dispatch(setNav(navData.adminNavDefault));
  }
  render() {
    return (
      <div>
        admin Page!
      </div>
    );
  }
}

MenuPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(MenuPage);
