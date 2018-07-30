/*
  eslint class-methods-use-this:0,
  eslint no-alert: 0,
*/
/* eslint no-restricted-globals: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import arraySort from 'array-sort';
import { bindActionCreators } from 'redux';

import navData from '../../../helpers/navData';
import filterify from '../../../helpers/filterify';
import { setNav } from '../../../actions/navLinksActions';
import {
  getTodayMenu, getAllMenus, postMenu,
  updateMenu, addMealToNewMenu, removeMealFromNewMenu,
  emptyNewMenu, emptyEditMenu, addMealInEditMenu,
  deleteMealInEditMenu, setMenuForEdit
} from '../../../actions/menuActions';
import { getMeals } from '../../../actions/mealActions';
import {
  setModal, deleteMealInEditModal,
  addMealInEditMenuModal
} from '../../../actions/modalActions';
import MenuTable from './MenuTable/MenuTable';
import SetMenuCard from './MenuCard/setMenu';
import Filter from '../../common/Filter';
import setFilter from '../../../actions/filterActions';
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
  }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals();
    this.props.getAllMenus();
    this.props.setFilter({ filter: 'all' });
    this.hideModal();
  }

  onSubmitUpdate(menuDate, meals) {
    const data = { meals };
    this.props.updateMenu({ menuDate, data });
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
    this.props.setMenuForEdit(meals);
    this.props.emptyNewMenu();
  }

  deleteRow(id) {
    this.props.deleteMealInEditModal(id);
    this.props.deleteMealInEditMenu(id);
  }

  render() {
    const { firstName, lastName } = this.props.user;
    return (
      <div>
        <div className="welcome">
          <p>
            welcome, {firstName} {lastName}
          </p>
        </div>
        <section className="setmenu">
          <div className="setmenu-container">
            <SetMenuCard
              setNewMenuMeal={this.setNewMenuMeal}
              submitNewMenu={this.submitNewMenu}
              {...this.props}
            />
          </div>
        </section>
        <section className="adminpage">
          <div className="menu-title">Menus List</div>
          <div className="table-container">
            <Filter
              {...this.props}
              tableContent="Menus_List"
            />
            {
              (this.props.menus.length === 0)
                ?
                  <p className="empty not-found">No menu found!</p>
                :
                  <div className="res-container">
                    <MenuTable
                      showMenuDetails={this.showMenuDetails}
                      editMenu={this.editMenu}
                      {...this.props}
                    />
                  </div>
            }
          </div>
        </section>
        <ModalComp
          hideModal={this.hideModal}
          deleteRow={this.deleteRow}
          submitUpdate={this.onSubmitUpdate}
          setNewMenuMeal={this.setNewMenuMeal}
          {...this.props}
        />
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  setNav: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  getAllMenus: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  addMealToNewMenu: PropTypes.func.isRequired,
  removeMealFromNewMenu: PropTypes.func.isRequired,
  postMenu: PropTypes.func.isRequired,
  newMenuMeals: PropTypes.array.isRequired,
  setModal: PropTypes.func.isRequired,
  deleteMealInEditModal: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  setMenuForEdit: PropTypes.func.isRequired,
  emptyNewMenu: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
  deleteMealInEditMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meals: arraySort(state.meal.meals, 'title'),
  newMenuMeals: state.menu.newMenu,
  menus: filterify(state.menu.allMenus, state.filter),
  modal: state.modal,
  editMenuMeals: state.menu.editMenu
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setNav,
    setModal,
    getMeals,
    emptyNewMenu,
    getAllMenus,
    getTodayMenu,
    updateMenu,
    postMenu,
    emptyEditMenu,
    addMealToNewMenu,
    removeMealFromNewMenu,
    setMenuForEdit,
    deleteMealInEditMenu,
    deleteMealInEditModal,
    addMealInEditMenu,
    addMealInEditMenuModal,
    setFilter
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
