import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard, mapStateToProps } from '../../../../components/adminpages/dashboard/Index';
import { modalDefaultState } from '../../../../reducers/modalReducer';
import { menuDefaultState } from '../../../../reducers/menuReducer';
import { mealDefaultState } from '../../../../reducers/mealReducer';
import { filterDefaultState } from '../../../../reducers/filterReducer';
import { menus, menuMeals } from '../../../__mockData__/menuMock';
import { meals } from '../../../__mockData__/mealMock';
import { user } from '../../../__mockData__/userMock';

describe('AdminDashboard component test', () => {
  const setup = () => {
    const props = {
      pagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      user,
      setFilter: jest.fn(),
      setNav: jest.fn(),
      getMeals: jest.fn(),
      deleteMenuMeal: jest.fn(),
      getAllMenus: jest.fn(),
      addMealToNewMenu: jest.fn(),
      deleteMealInEditMenu: jest.fn(),
      setMenuForEdit: jest.fn(),
      updateMenu: jest.fn(),
      setModal: jest.fn(),
      removeMealFromNewMenu: jest.fn(),
      postMenu: jest.fn(),
      emptyNewMenu: jest.fn(),
      meals,
      newMenuMeals: menuMeals,
      menus,
      menuMeals,
      modal: {},
      editMenuMeals: menuMeals,
    };

    return shallow(<AdminDashboard {...props} />)
  };


  it('should render `CustomerDashboard` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should map state to props', () => {
    const initialState = {
      meal: {
        ...mealDefaultState
      },
      menu: {
        ...menuDefaultState
      },
      modal: {
        ...modalDefaultState
      },
      filter: {
        ...filterDefaultState
      }
    };

    const ownProps = {
      pagination: {
        limit: 12,
        offset: 0,
        count: 13,
        nextOffset: 12
      },
      mealPagination:  {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      menuMealsPagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      editMenuMeals: menuMeals,
      menuMeals,
      meals,
      newMenuMeals: menuMeals,
      modal: {
        isEdit: true
      },
      menus
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  });

  it('should call `onSubmitUpdate`', (done) => {
    const wrapper = setup();


    const onSubmitUpdateSpy= jest.spyOn(wrapper.instance(), 'onSubmitUpdate');
    wrapper.instance().onSubmitUpdate('2018-08-07', meals)
    expect(onSubmitUpdateSpy).toHaveBeenCalled();

    done();
  });

  it('should call `setNewMenuMeal`', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    '<div>' +
    `  <input type="checkbox" id="checkbox-1" checked=true />` +
    `  <input type="checkbox" id="1-edit" checked=true />` +
    '</div>';


    const setNewMenuMealSpy= jest.spyOn(wrapper.instance(), 'setNewMenuMeal');
    wrapper.instance().setNewMenuMeal('1')
    expect(setNewMenuMealSpy).toHaveBeenCalled();

    done();
  });

  it('should call `getMenus`', (done) => {
    const wrapper = setup();

    const getMenusSpy= jest.spyOn(wrapper.instance(), 'getMenus');
    wrapper.instance().getMenus({})
    expect(getMenusSpy).toHaveBeenCalled();

    done();
  });


  it('should call `hideModal`', (done) => {
    const wrapper = setup();

    const hideModalSpy= jest.spyOn(wrapper.instance(), 'hideModal');
    wrapper.instance().hideModal({})
    expect(hideModalSpy).toHaveBeenCalled();

    done();
  });


  it('should call `showMenuDetails`', (done) => {
    const wrapper = setup();

    const showMenuDetailsSpy= jest.spyOn(wrapper.instance(), 'showMenuDetails');
    wrapper.instance().showMenuDetails({})
    expect(showMenuDetailsSpy).toHaveBeenCalled();

    done();
  });

  it('should call `editMenu`', (done) => {
    const wrapper = setup();

    const editMenuSpy= jest.spyOn(wrapper.instance(), 'editMenu');
    wrapper.instance().editMenu({})
    expect(editMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should call `unCheckAll`', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    '<div>' +
    `  <input type="checkbox" id="checkbox-1" checked=true />` +
    '</div>';


    const unCheckAllSpy= jest.spyOn(wrapper.instance(), 'unCheckAll');
    wrapper.instance().unCheckAll([1])
    expect(unCheckAllSpy).toHaveBeenCalled();

    done();
  });

  // it('should call `submitNewMenu`', (done) => {
  //   const wrapper = setup();

  //   document.body.innerHTML =
  //   '<div>' +
  //   `  <input type="date" id="postOn" value="02/09/2018" />` +
  //   '</div>';

  //   const data = {
  //     selected: 1
  //   };

  //   const submitNewMenuSpy= jest.spyOn(wrapper.instance(), 'submitNewMenu');
  //   wrapper.instance().submitNewMenu(data)
  //   expect(submitNewMenuSpy).toHaveBeenCalled();

  //   done();
  // });

  it('should call `handlePaginationClick`', (done) => {
    const wrapper = setup();

    const data = {
      selected: 1
    };

    const handlePaginationClickSpy= jest.spyOn(wrapper.instance(), 'handlePaginationClick');
    wrapper.instance().handlePaginationClick(data)
    expect(handlePaginationClickSpy).toHaveBeenCalled();

    done();
  });
});
