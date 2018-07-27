/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import navData from '../../helpers/navData';
import Menu from '../common/Menu';

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
      <div>
        <div className="welcome">
          <p className="merienda">
            Welcome, {firstName} {lastName}
          </p>
        </div>
        <div>
          <Menu
            menu={todayMenu}
            {...this.props}
          />
        </div>
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
