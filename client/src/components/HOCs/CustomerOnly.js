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
import { addMealToCart } from '../../actions/cartActions';
import { setDefaultNav, setNav } from '../../actions/navLinksActions';

/**
 * @export {function} HOC function that returns a component if user is customer
 * @param  {Component} Comp Component
 * @return {Component} only if user is a customer
 */
export default function (Comp) {
  class CustomerOnly extends Component {
    constructor(props) {
      super(props);
      this.state = {
        token: '',
        admin: undefined
      };
    }

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
          admin = undefined
        } = decodedToken;

        if (!exp || admin !== false) {
          deleteInLocalStorage('jwt');
          return history.push('/login');
        }

        if (isExpired(exp)) {
          this.props.setDefaultNav();
          return history.push('/login');
        }

        this.setState({ token, admin });
      }
      if (!token || this.state.admin) {
        this.props.setDefaultNav();
        return history.push('/');
      }
    }

    render() {
      const { token, admin } = this.state;
      return (
        <div className="hoc">
          {
            (admin !== undefined && admin === false)
              && <Comp {...this.props} token={token} />
          }
        </div>
      );
    }
  }

  CustomerOnly.propTypes = {
    history: PropTypes.object.isRequired,
    setDefaultNav: PropTypes.func.isRequired,
    setNav: PropTypes.func.isRequired,
    todayMenu: PropTypes.array.isRequired,
    addMealToCart: PropTypes.func.isRequired,

  };

  const mapStateToProps = state => ({
    todayMenu: state.menu.todayMenu
  });

  const mapDispatchToProps = dispatch => bindActionCreators(
    {
      setDefaultNav,
      setNav,
      addMealToCart
    },
    dispatch
  );

  return connect(
    mapStateToProps, mapDispatchToProps
  )(withRouter(CustomerOnly));
}
