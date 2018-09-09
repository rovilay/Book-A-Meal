import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import isExpired from '../../helpers/isExpired';
import { getFromLocalStorage } from '../../helpers/localstorage';
import { getTodayMenu } from '../../actions/menuActions';
import { addMealToCart } from '../../actions/cartActions';
import { setDefaultNav, setNav } from '../../actions/navLinksActions';

/**
 *
 * @export {function} HOC function that returns a component
 * @param  {any} ComponentA Caterer/Admin dashboard component
 * @param  {any} ComponentB Customer dashboard component
 * @return {Component} depending on if user is a customer or caterer/admin
 */
export default function (ComponentA, ComponentB) {
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
      const token = getFromLocalStorage('jwt');
      const user = getFromLocalStorage('user');
      if (token) {
        const {
          exp,
          admin
        } = jwt.decode(token);

        if (isExpired(exp)) {
          this.props.setDefaultNav();
          return history.push('/login');
        }

        this.setState({ token, user, admin });
      } else {
        history.push('/login');
      }
    }

    render() {
      const { token, user, admin } = this.state;

      return (
        <div>
          {
            (admin) && <ComponentA {...this.props} token={token} user={user} />
          }

          {
            (admin !== '' && !admin)
            &&

            <ComponentB {...this.props} token={token} user={user} />

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
      addMealToCart
    },
    dispatch
  );

  return connect(
    mapStateToProps, mapDispatchToProps
  )(withRouter(ChooseDashboard));
}
