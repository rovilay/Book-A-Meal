import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import isExpired from '../../helpers/isExpired';
import { getFromLs } from '../../helpers/Ls';
import { setDefaultNav, setNav } from '../../actions/navLinks';

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
        token: ''
      };
    }

    componentWillMount() {
      const { history } = this.props;
      const { expire, admin } = this.props.user;
      const token = getFromLs('jwt');

      if (!admin || !token) {
        this.props.setDefaultNav();
        return history.push('/');
      }

      if (isExpired(expire)) {
        this.props.setDefaultNav();
        return history.push('/login');
      }

      this.setState({ token });
    }

    render() {
      const { token } = this.state;
      const { admin } = this.props.user;
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
    user: PropTypes.object.isRequired,
    todayMenu: PropTypes.array.isRequired,
  };

  const mapStateToProps = state => ({
    user: state.login.user,
    todayMenu: state.todayMenu.Meals
  });

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      setDefaultNav,
      setNav,
    },
    dispatch
  );

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminOnly));
}
