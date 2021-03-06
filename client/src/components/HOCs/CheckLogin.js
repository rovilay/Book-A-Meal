import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

import isExpired from '../../helpers/isExpired';
import {
  getFromLocalStorage,
  deleteInLocalStorage
} from '../../helpers/localstorage';

export default (Comp) => {
  class CheckLogin extends Component {
    componentWillMount() {
      const { history } = this.props;
      const token = getFromLocalStorage('jwt');

      if (token) {
        const decodedToken = jwt.decode(token);
        if (!decodedToken) {
          deleteInLocalStorage('jwt');
          return history.push('/login');
        }

        const {
          exp
        } = decodedToken;

        if (exp && !isExpired(exp)) {
          history.push('/dashboard');
        }
      }
    }

    render() {
      return (
        <div className="hoc">
          <Comp {...this.props} />
        </div>
      );
    }
  }

  CheckLogin.propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  return connect()(withRouter(CheckLogin));
};
