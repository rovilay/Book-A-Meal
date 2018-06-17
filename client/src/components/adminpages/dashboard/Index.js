/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import navData from '../../../helpers/navData';
import { setNav } from '../../../actions/navLinks';
import adminActions from '../../../actions/admin';
import MenuTable from './MenuTable/MenuTable';
import SetMenuCard from './MenuCard/setMenu';
import ModalComp from './Modal/Modal';
import Footer from '../../common/Footer';


class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    this.setNewMenuMeal = this.setNewMenuMeal.bind(this);
    this.submitNewMenu = this.submitNewMenu.bind(this);
    this.showMenuDetails = this.showMenuDetails.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.editMenu = this.editMenu.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    this.notify = this.notify.bind(this);
  }

  // componentWillMount() {
  //   this.props.setDefault();
  // }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals();
    this.props.getMenus();
    this.hideModal();
  }

  onSubmitUpdate(menuDate, meals) {
    const { updateMenu, serverRes } = this.props;
    const data = { meals };
    updateMenu({ menuDate, data });
    setTimeout(() => {
      this.notify(serverRes.message);
    }, 2000);
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

  hideModal() {
    this.props.setModal({
      isOpen: false,
      isEdit: false,
      isInfo: false,
      close: true,
      contentLabel: '',
      content: {}
    });
  }

  showMenuDetails(menuDetail) {
    this.props.setModal({
      isOpen: true,
      isInfo: true,
      isEdit: false,
      close: false,
      contentLabel: 'Menu details',
      content: { menuDetails: [...menuDetail] }
    });
  }

  editMenu({ menuId, postOn, meals }) {
    this.props.setModal({
      isOpen: true,
      isInfo: false,
      isEdit: true,
      close: false,
      contentLabel: 'Edit Menu',
      content: { menuId, postOn, meals }
    });
  }

  deleteRow(id) {
    this.props.deleteMealInEditModal(id);
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
            showMenuDetails={this.showMenuDetails}
            editMenu={this.editMenu}
            {...this.props}
          />
        </div>
        <ModalComp
          hideModal={this.hideModal}
          deleteRow={this.deleteRow}
          submitUpdate={this.onSubmitUpdate}
          notify={this.notify}
          {...this.props}
        />
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
  serverRes: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  deleteMealInEditModal: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meals: state.admin.meals,
  newMenuMeals: state.admin.setMenuMeals,
  menus: state.admin.menus,
  serverRes: state.admin.serverRes,
  modal: state.admin.modal
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setNav,
    ...adminActions
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
