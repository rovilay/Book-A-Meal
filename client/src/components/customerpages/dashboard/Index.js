import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../assets/css/menu.css';
import waiter from '../../../assets/images/waiter2.svg';
import navData from '../../../helpers/navData';
import Menu from '../../common/Menu';
import Footer from '../../common/Footer';


class CustomerDashboard extends Component {
  componentWillMount() {
    const { history, token } = this.props;
    if (!token) {
      history.push('/');
    }
  }

  componentDidMount() {
    const { getTodayMenu, setNav } = this.props;
    setNav(navData.customerNav);
    getTodayMenu();
  }

  render() {
    const { user, todayMenu } = this.props;
    const { firstName, lastName } = user;
    return (
      <div className="main-container">
        <div className="container">
          <div className="welcome">
            <p>
              Welcome, {firstName} {lastName}
            </p>
            <img
              className="img-circle"
              src={waiter}
              alt="waiter"
            />
            <p>Happy Eating!</p>
          </div>
          <Menu
            menu={todayMenu}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

CustomerDashboard.propTypes = {
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  todayMenu: PropTypes.array.isRequired,
  setNav: PropTypes.func.isRequired,
};

export default CustomerDashboard;
