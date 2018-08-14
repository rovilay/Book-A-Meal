import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import isExpired from '../../helpers/isExpired';
import { getFromLs } from '../../helpers/Ls';
import { setDefaultNav, setNav } from '../../actions/navLinksActions';

/**
 * @export {function} HOC function that returns a component if user is admin/caterer
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

    componentWillMount() {
      const { history } = this.props;
      const token = getFromLs('jwt');
      const {
        exp,
        admin
      } = jwt.decode(token);

      if (!token || !admin) {
        this.props.setDefaultNav();
        return history.push('/');
      }

      if (isExpired(exp)) {
        this.props.setDefaultNav();
        return history.push('/login');
      }

      this.setState({ token, admin });
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
