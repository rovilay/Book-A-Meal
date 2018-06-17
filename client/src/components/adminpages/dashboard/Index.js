/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import navData from '../../../helpers/navData';
import { setNav } from '../../../actions/navLinks';
import {
  getMeals,
  addMealToNewMenu,
  removeMealFromNewMenu,
  getMenus,
  postMenu
} from '../../../actions/admin';
import MenuTable from './MenuTable/MenuTable';
import SetMenuCard from './MenuCard/setMenu';
import Footer from '../../common/Footer';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.setNewMenuMeal = this.setNewMenuMeal.bind(this);
    this.submitNewMenu = this.submitNewMenu.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals();
    this.props.getMenus();
  }

  setNewMenuMeal(mealId) {
    const checkbox = document.getElementById(mealId);
    if (checkbox.checked === true) {
      this.props.addMealToNewMenu(mealId);
    } else {
      this.props.removeMealFromNewMenu(mealId);
    }
  }

  submitNewMenu(e) {
    e.preventDefault();
    const meals = [...this.props.newMenuMeals];
    const date = document.getElementById('postOn').value;
    const postOn = date.split('/').reverse().join('-');
    this.props.postMenu({ postOn, meals });

    setTimeout(() => {
      this.notify(this.props.serverRes.message);
    }, 200);
  }

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="welcome">
          <img
            src="https://res.cloudinary.com/dcqnswemi/image/upload/v1529142686/chef2.svg"
            alt="chef-img"
          />
          <h3>
            <b>Akinola Ogooluwa</b>
          </h3>
        </div>
        <div className="setmenu-container">
          <SetMenuCard
            setNewMenuMeal={this.setNewMenuMeal}
            submitNewMenu={this.submitNewMenu}
            {...this.props}
          />
        </div>
        <div className="container">
          <div className="menu-title">Menu List</div>
          <MenuTable
            {...this.props}
          />
        </div>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  setNav: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  addMealToNewMenu: PropTypes.func.isRequired,
  removeMealFromNewMenu: PropTypes.func.isRequired,
  getMenus: PropTypes.func.isRequired,
  postMenu: PropTypes.func.isRequired,
  newMenuMeals: PropTypes.array.isRequired,
  serverRes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meals: state.admin.meals,
  newMenuMeals: state.admin.setMenuMeals,
  menus: state.admin.menus,
  serverRes: state.admin.serverRes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setNav,
    getMeals,
    addMealToNewMenu,
    removeMealFromNewMenu,
    getMenus,
    postMenu
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
