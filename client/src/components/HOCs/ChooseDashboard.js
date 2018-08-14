import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import isExpired from '../../helpers/isExpired';
import { getFromLs } from '../../helpers/Ls';
import { getTodayMenu } from '../../actions/menuActions';
import { addToCart } from '../../actions/cartActions';
import { setDefaultNav, setNav } from '../../actions/navLinksActions';

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
        token: '',
        user: {},
        admin: ''
      };
    }

    componentWillMount() {
      const { history } = this.props;
      const token = getFromLs('jwt');
      const user = getFromLs('user');
      const {
        exp,
        admin
      } = jwt.decode(token);

      if (token && isExpired(exp)) {
        this.props.setDefaultNav();
        return history.push('/login');
      }

      this.setState({ token, user, admin });
    }

    render() {
      const { token, user, admin } = this.state;

      return (
        <div>
          {
            (admin) && <CompA {...this.props} token={token} user={user} />
          }

          {
            (admin !== '' && !admin)
            &&

            <CompB {...this.props} token={token} user={user} />

          }
        </div>
      );
    }
  }

  ChooseDashboard.propTypes = {
    history: PropTypes.object.isRequired,
    setDefaultNav: PropTypes.func.isRequired,
    setNav: PropTypes.func.isRequired,
    todayMenu: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    todayMenu: state.menu.todayMenu,
    cart: state.cart.meals,
    pagination: state.menu.pagination
  });

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      setDefaultNav,
      getTodayMenu,
      setNav,
      addToCart,
    },
    dispatch
  );

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(ChooseDashboard));
}
