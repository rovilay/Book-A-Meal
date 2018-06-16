import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import navData from '../../helpers/navData';
import { setNav } from '../../actions/navLinks';


class AdminDashboard extends Component {
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

AdminDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AdminDashboard);
