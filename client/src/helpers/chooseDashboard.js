import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

import isExpired from './isExpired';
import { setDefaultNav } from '../actions/navLinks';
import { getFromLs } from './Ls';

export default function (CompA, CompB) {
  class chooseDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: {},
        expire: ''
      };
    }

    componentWillMount() {
      const { history, dispatch } = this.props;
      const token = getFromLs('jwt');
      if (token) {
        const {
          user: userData,
          exp
        } = jwt.decode(token);

        this.setState({ userData: { ...userData }, expire: exp });
      } else {
        history.push('/login');
        dispatch(setDefaultNav());
      }

      const { expire } = this.state;

      if (isExpired(expire)) {
        history.push('/');
        dispatch(setDefaultNav());
      }
    }

    render() {
      const { admin } = this.state.userData;
      return (
        <div>
          {
            (admin) && <CompA />
          }
          {
            (!admin) && <CompB />
          }
        </div>
      );
    }
  }

  chooseDashboard.propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    user: state.login.user
  });

  return connect(mapStateToProps)(withRouter(chooseDashboard));
}
