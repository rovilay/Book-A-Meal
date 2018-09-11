import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import isExpired from '../../helpers/isExpired';
import {
  getFromLocalStorage,
  deleteInLocalStorage
} from '../../helpers/localstorage';
import { setDefaultNav, setNav } from '../../actions/navLinksActions';

/**
 * @export {function} HOC function that returns
  a component if user is admin/caterer
 * @param  {Component} Comp Component
 * @return {Component} only if user is a caterer/admin
 */
export default function (Comp) {
  class AdminOnly extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        admin: undefined
      };
    }

    /* istanbul ignore next */
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
          exp,
          admin
        } = decodedToken;

        if (!exp || !admin) {
          deleteInLocalStorage('jwt');
          this.props.setDefaultNav();
          return history.push('/login');
        }

        if (!admin) {
          this.props.setDefaultNav();
          return history.push('/');
        }

        if (exp && isExpired(exp)) {
          this.props.setDefaultNav();
          return history.push('/login');
        }

        this.setState({ token, admin });
      }

      if (!token) {
        this.props.setDefaultNav();
        return history.push('/');
      }
    }

    render() {
      const { token, admin } = this.state;
      return (
        <div>
          {
            (admin) && <Comp {...this.props} token={token} />
          }
        </div>
      );
    }
  }

  AdminOnly.propTypes = {
    history: PropTypes.object.isRequired,
    setDefaultNav: PropTypes.func.isRequired,
    setNav: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      setDefaultNav,
      setNav,
    },
    dispatch
  );

  return connect('', mapDispatchToProps)(withRouter(AdminOnly));
}
