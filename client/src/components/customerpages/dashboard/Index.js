/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../assets/css/menu.css';
import navData from '../../../helpers/navData';
import Menu from '../../common/Menu';
import Footer from '../../common/Footer';

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.notify = this.notify.bind(this);
  }
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

  /**
   * Notifies if meal is added to cart
   */
  notify() {
    toast.success('Meal added to cart!', {
      position: toast.POSITION.BOTTOM_LEFT,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  render() {
    const { user, todayMenu } = this.props;
    const { firstName, lastName } = user;
    return (
      <div className="main-container">
        <div className="welcome">
          <p>
            Welcome, {firstName} {lastName}
          </p>
          <img
            className="img-circle"
            src="https://res.cloudinary.com/dcqnswemi/image/upload/v1529142882/waiter2.svg"
            alt="waiter"
          />
          <p>Happy Eating!</p>
        </div>
        <div className="container">
          <Menu
            menu={todayMenu}
            notify={this.notify}
            {...this.props}
          />
        </div>
        <ToastContainer />
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
