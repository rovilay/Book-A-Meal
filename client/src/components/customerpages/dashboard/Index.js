import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { storeInLs, getFromLs } from '../../../helpers/Ls';
import serverReq from '../../../helpers/serverReq';
import '../../../assests/css/menu.css';
// import waiter from '../../../assests/images/waiter2.svg';
import navData from '../../../helpers/navData';
import { setNav } from '../../../actions/navLinks';
import setTodayMenu from '../../../actions/menu';
import Menu from '../../common/Menu';
import Footer from '../../common/Footer';


class CustomerDashboard extends Component {
  componentWillMount() {
    const [DD, MM, YYYY] = moment().format('DD-MM-YYYY').split('-');
    const { history, token } = this.props;
    if (token) {
      serverReq('get', `/api/v1/menus/${DD}/${MM}/${YYYY}`, '', token)
        .then((response) => {
          const { data } = response;
          if (data) {
            storeInLs('todayMenu', data);
          }
        })
        .catch(err => err);
    } else {
      history.push('/');
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const todayMenu = getFromLs('todayMenu');

    dispatch(setNav(navData.customerNav));
    console.log(todayMenu);

    if (todayMenu) {
      const { success, message, menu } = todayMenu;
      const { Meals } = menu[0];
      dispatch(setTodayMenu({ success, message, Meals }));
    }
  }

  render() {
    const { todayMenu } = this.props;
    return (
      <div>
        <div className="container">
          <div className="welcome">
            <img
              className="img-circle"
              src="../../../assests/images/waiter2.svg"
              alt="waiter"
            />
            <p>Happy Eating!</p>
          </div>
        </div>
        <Menu menu={todayMenu} />
        <Footer />
      </div>
    );
  }
}

CustomerDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  todayMenu: PropTypes.array.isRequired
};

export default CustomerDashboard;
