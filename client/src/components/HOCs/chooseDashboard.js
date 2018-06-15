import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import isExpired from '../../helpers/isExpired';
import { getFromLs } from '../../helpers/Ls';
import { setDefaultNav } from '../../actions/navLinks';

/**
 *
 * @export {function} HOC function that returns a component
 * @param  {any} CompA Caterer/Admin dashboard component
 * @param  {any} CompB Customer dashboard component
 * @return {Component} depending on if user is a customer or caterer/admin
 */
export default function (CompA, CompB) {
  class ChooseDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: ''
      };
    }

    componentWillMount() {
      const { history, dispatch } = this.props;
      const { expire } = this.props.user;
      const token = getFromLs('jwt');

      if (isExpired(expire)) {
        dispatch(setDefaultNav());
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
    todayMenu: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    user: state.login.user,
    todayMenu: state.todayMenu.Meals
  });

  return connect(mapStateToProps)(withRouter(ChooseDashboard));
}
