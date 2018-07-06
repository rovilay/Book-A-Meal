/*
  eslint class-methods-use-this:0,
  eslint no-restricted-globals: 0,
  eslint no-restricted-globals: 0,
  eslint no-alert: 0,
*/
/* eslint no-restricted-globals: 0 */
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
import FilterComp from '../../common/Filter';
import filterAction from '../../../actions/filter';
import ModalComp from '../Modal/Index';

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
    this.unCheckAll = this.unCheckAll.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals();
    this.props.getMenus();
    this.props.filterAction('menus_list', { filter: 'all' });
    this.hideModal();
  }

  onSubmitUpdate(menuDate, meals) {
    const { updateMenu } = this.props;
    const data = { meals };
    updateMenu({ menuDate, data });
    setTimeout(() => {
      this.notify(this.props.serverRes.message);
      location.reload();
    }, 200);
  }

  setNewMenuMeal(mealId) {
    let checkbox;
    if (this.props.modal.isEdit) {
      checkbox = document.getElementById(`${mealId}-edit`);
    } else {
      checkbox = document.getElementById(mealId);
    }
    if (checkbox.checked === true) {
      this.props.addMealToNewMenu(mealId);
    } else if (checkbox.checked === false) {
      this.props.removeMealFromNewMenu(mealId);
    }
  }

  unCheckAll(mealIdArr) {
    mealIdArr.forEach((mealId) => {
      const checkbox = document.getElementById(mealId);
      checkbox.checked = false;
    });
  }

  submitNewMenu() {
    const meals = [...this.props.newMenuMeals];
    const date = document.getElementById('postOn').value;
    const postOn = date.split('/').reverse().join('-');
    this.props.postMenu({ postOn, meals });
    location.reload();
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
    this.props.emptyNewMenu();
  }

  deleteRow(id) {
    this.props.deleteMealInEditModal(id);
  }

  render() {
    return (
      <div>
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
          <div className="menu-title">Menus List</div>
          <FilterComp
            {...this.props}
            tableContent="Menus_List"
          />
          {
            (this.props.filteredMenus.length === 0)
            ?
              <p className="empty not-found">No menu found!</p>
            :
              <MenuTable
                showMenuDetails={this.showMenuDetails}
                editMenu={this.editMenu}
                {...this.props}
              />

          }
        </div>
        <ModalComp
          hideModal={this.hideModal}
          deleteRow={this.deleteRow}
          submitUpdate={this.onSubmitUpdate}
          notify={this.notify}
          setNewMenuMeal={this.setNewMenuMeal}
          {...this.props}
        />
        <ToastContainer />
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
  updateMenu: PropTypes.func.isRequired,
  emptyNewMenu: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  filterAction: PropTypes.func.isRequired,
  filteredMenus: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  meals: state.admin.meals,
  newMenuMeals: state.admin.setMenuMeals,
  menus: state.admin.menus,
  filteredMenus: state.admin.filteredMenus,
  serverRes: state.admin.serverRes,
  modal: state.admin.modal,
  editMenuMeals: state.admin.editMenuMeals
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setNav,
    ...adminActions,
    filterAction
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
