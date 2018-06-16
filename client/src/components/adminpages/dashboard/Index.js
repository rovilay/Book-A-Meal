import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../../assets/css/create-menu.css';
import navData from '../../../helpers/navData';
import { setNav } from '../../../actions/navLinks';
import { getMeals, setdefault, setNewMenu, getMenus } from '../../../actions/admin';
import MenuTable from './Table/Index';
import SetMenuCard from './setMenu';
import Footer from '../../common/Footer';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.addMealToMenu = this.addMealToMenu.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals();
    this.props.getMenus();
  }

  addMealToMenu(mealId) {
    this.props.setNewMenu(mealId);
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
            {...this.props}
            addMealToMenu={this.addMealToMenu}
          />
        </div>
        <div className="container">
          <MenuTable
            {...this.props}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  setNav: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  setNewMenu: PropTypes.func.isRequired,
  getMenus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meals: state.admin.meals,
  setMenuMeals: state.admin.setMenuMeals,
  menus: state.admin.menus
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setNav,
    getMeals,
    setNewMenu,
    getMenus
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
