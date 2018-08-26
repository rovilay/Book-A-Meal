import React from 'react';
import { shallow } from 'enzyme';
import { CustomerOrderPage, mapStateToProps } from '../../../../components/customerpages/orderPage/Index';
import { userDataDefaultState } from '../../../../reducers/loginReducer';
import { filterDefaultState } from '../../../../reducers/filterReducer';
import { ordersDefaultState } from '../../../../reducers/ordersReducer';
import { modalDefaultState } from '../../../../reducers/modalReducer';
import { orders } from '../../../__mockData__/orderMock';


const props = {
  pagination: {
    limit: 12,
    count: 13,
    numOfPages: 2
  },
  setNav: jest.fn(),
  orders,
  history: {
    push: jest.fn()
  },
  modal: {},
  setModal: jest.fn(),
  updateOrder: jest.fn(),
  deleteMealInEditOrder: jest.fn(),
  updateOrderedMealPortion: jest.fn(),
  grandTotalPrice: 1100,
  getOrders: () => Promise.resolve(),
  getOrderMeals: () => Promise.resolve(),
  editOrder: jest.fn(),
  setEditOrder: jest.fn(),
  setFilter: jest.fn(),
  orderedMealsPagination:  {
    limit: 12,
    count: 13,
    numOfPages: 2
  }
};

describe('CustomerDashboard component test', () => {
  const setup = () => shallow(<CustomerOrderPage {...props} />);


  it('should render `CustomerOrderPage` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `onEditOrder`', (done) => {
    const wrapper = setup();

    const onEditOrderSpy= jest.spyOn(wrapper.instance(), 'onEditOrder');
    wrapper.instance().onEditOrder(orders[0].Meals)
    expect(onEditOrderSpy).toHaveBeenCalled();

    done();
  });


  it('should call `showDetails`', (done) => {
    const wrapper = setup();

    const showDetailsSpy= jest.spyOn(wrapper.instance(), 'showDetails');
    wrapper.instance().showDetails(orders[0].Meals)
    expect(showDetailsSpy).toHaveBeenCalled();

    done();
  });


  it('should call `deleteRow`', (done) => {
    const wrapper = setup();


    const deleteRowSpy= jest.spyOn(wrapper.instance(), 'deleteRow');
    wrapper.instance().deleteRow('1')
    expect(deleteRowSpy).toHaveBeenCalled();

    done();
  });


  it('should call `updatePortion`', (done) => {
    const wrapper = setup();


    const updatePortionSpy= jest.spyOn(wrapper.instance(), 'updatePortion');
    wrapper.instance().updatePortion('1', 2)
    expect(updatePortionSpy).toHaveBeenCalled();

    done();
  });


  it('should call `getCustomerOrders`', (done) => {
    const wrapper = setup();
    localStorage.setItem('jwt', customerToken);

    const getCustomerOrdersSpy= jest.spyOn(wrapper.instance(), 'getCustomerOrders');
    wrapper.instance().getCustomerOrders(2)
    expect(getCustomerOrdersSpy).toHaveBeenCalled();

    done();
  });


  it('should call `hideModal`', (done) => {
    const wrapper = setup();

    const hideModalSpy= jest.spyOn(wrapper.instance(), 'hideModal');
    wrapper.instance().hideModal()
    expect(hideModalSpy).toHaveBeenCalled();

    done();
  });

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

  it('should map state to props', () => {
    const initialState = {
      orders: {
        ...ordersDefaultState
      },
      modal: {
        ...modalDefaultState
      },
      login: {
        ...userDataDefaultState
      },
      filter: {
        ...filterDefaultState
      }
    };

    const ownProps = {
        pagination: {
          limit: 12,
          count: 13,
          numOfPages: 2
        },
        orders,
        modal: () => [],
        grandTotalPrice: 1100,
        orderedMealsPagination:  {
          limit: 12,
          count: 13,
          numOfPages: 2
        }
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});
