import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';

import isExpired from './isExpired';
import { setDefaultNav } from '../actions/navLinks';
import { getFromLs } from './Ls';

export default function (CompA, CompB) {
  class ChooseDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userData: {},
        expire: '',
        token: ''
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

        this.setState({ userData: { ...userData }, expire: exp, token });
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
      const { userData, token } = this.state;
      const { admin } = userData;
      return (
        <div>
          {
            (admin) && <CompA {...this.props} token={token} />
          }
          {
            (!admin) && <CompB {...this.props} token={token} />
          }
        </div>
      );
    }
  }

  ChooseDashboard.propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    todayMenu: PropTypes.array.isRequired
  };

  const mapStateToProps = state => ({
    user: state.login.user,
    todayMenu: state.todayMenu.Meals
  });

  return connect(mapStateToProps)(withRouter(ChooseDashboard));
}
