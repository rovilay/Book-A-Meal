/*
  eslint class-methods-use-this:0,
  eslint no-alert: 0,
*/
/* eslint no-restricted-globals: 0 */
import arraySort from 'array-sort';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Accordion,
} from 'react-accessible-accordion';

import navData from '../../../helpers/navData';
import filterify from '../../../helpers/filterify';
import { setNav } from '../../../actions/navLinksActions';
import {
  getTodayMenu, getAllMenus, postMenu,
  updateMenu, addMealToNewMenu, removeMealFromNewMenu,
  emptyNewMenu, emptyEditMenu, addMealInEditMenu,
  deleteMealInEditMenu, setMenuForEdit, getMenuMeals,
  deleteMealInMenu, deleteMenuMeal
} from '../../../actions/menuActions';
import { getMeals } from '../../../actions/mealActions';
import {
  setModal, deleteMealInEditModal,
  addMealInEditMenuModal
} from '../../../actions/modalActions';
import MenuTable from './MenuTable/MenuTable';
import SetMenuCard from './MenuCard/SetMenu';
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
    this.getMenus = this.getMenus.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNavDefault);
    this.props.getMeals({});
    this.props.getAllMenus({});
    this.props.setFilter({ filter: 'all' });
    this.hideModal();
  }

  onSubmitUpdate(menuDate, meals) {
    this.props.updateMenu({ menuDate, meals });
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

  /**
   * gets menus
   * @param {number} limit pagination limit
   * @param {number} offset pagination offset
   * @param {string} menuUrl menu meals url to get meals for a menu
   */
  getMenus({ limit, offset, menuUrl }) {
    this.props.getAllMenus({
      limit,
      offset,
      menuUrl
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
    getMeals({});
    this.props.setModal({
      isOpen: true,
      isInfo: false,
      isEdit: true,
      close: false,
      contentLabel: 'Add Meals',
      content: { menuId, postOn, meals }
    });
    this.props.setMenuForEdit(meals);
    this.props.emptyNewMenu();
  }

  deleteRow(id) {
    this.props.deleteMealInEditModal(id);
    this.props.deleteMealInEditMenu(id);
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


  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    // const nextPage = data.selected + 1;
    const { limit } = this.props.pagination;
    const offset = (data.selected) * limit;
    this.getMenus({ limit, offset });
  }

  render() {
    const { user } = this.props;
    const { firstName, lastName } = user;
    return (
      <div>
        <div className="welcome">
          <p className="merienda">
            welcome, {firstName} {lastName}
          </p>
        </div>
        <section className="setmenu">
          <Accordion>
            <div className="setmenu-container">
              <SetMenuCard
                setNewMenuMeal={this.setNewMenuMeal}
                submitNewMenu={this.submitNewMenu}
                {...this.props}
              />
            </div>
          </Accordion>
        </section>
        {/* <MenuAccordion /> */}
        <section className="adminpage">
          <div className="menu-title">Menus List</div>
          <div className="container">
            <Filter
              {...this.props}
              tableContent="Menus_List"
            />
            {
              (this.props.menus.length === 0)
                ?
                  <p className="empty not-found">No menu found!</p>
                :
                  <Accordion>
                    <MenuTable
                      showMenuDetails={this.showMenuDetails}
                      editMenu={this.editMenu}
                      {...this.props}
                    />
                  </Accordion>
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
  deleteMealInEditMenu: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  meals: arraySort(state.meal.meals, 'title'),
  newMenuMeals: state.menu.newMenu,
  menus: filterify(state.menu.allMenus, state.filter),
  menuMeals: state.menu.menuMeals,
  pagination: state.menu.pagination,
  menuMealsPagination: state.menu.menuMealsPagination,
  modal: state.modal,
  editMenuMeals: state.menu.editMenu,
  mealPagination: state.meal.pagination,
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
    deleteMealInMenu,
    deleteMealInEditModal,
    addMealInEditMenu,
    addMealInEditMenuModal,
    getMenuMeals,
    setFilter,
    deleteMenuMeal
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
