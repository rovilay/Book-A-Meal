import React from 'react';
import { shallow } from 'enzyme';
import { OrderHistory, mapStateToProps } from '../../../../components/adminpages/orderPage/Index';
import { modalDefaultState } from '../../../../reducers/modalReducer';
import { ordersDefaultState } from '../../../../reducers/ordersReducer';
import { filterDefaultState } from '../../../../reducers/filterReducer';
import { orders } from '../../../__mockData__/orderMock';


const props = {
  pagination: {
    limit: 12,
    count: 13,
    numOfPages: 2
  },
  setModal: jest.fn(),
  modal: {
    isOpen: true,
    isEdit: true,
    isOrderInfo: true,
    contentLabel: 'Modal',
    content: {}
  },
  getAllOrders: jest.fn(),
  setFilter: jest.fn(),
  orders,
  setNav: jest.fn(),
  grandTotalPrice: 1100,
  getOrderMeals: () => Promise.resolve()
};

describe('OrderHistory component test', () => {
  const setup = () => shallow(<OrderHistory {...props} />);


  it('should render `OrderHistory` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

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


  it('should call `showDetails`', (done) => {
    const wrapper = setup();


    const showDetailsSpy= jest.spyOn(wrapper.instance(), 'showDetails');
    wrapper.instance().showDetails('orders/1/meals')
    expect(showDetailsSpy).toHaveBeenCalled();

    done();
  });


  it('should display `No orders found!` if no orders', (done) => {
    props.orders = [];
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should map state to props', () => {
    const initialState = {
      modal: {
        ...modalDefaultState
      },
      orders: {
        ...ordersDefaultState
      },
      filter: {
        ...filterDefaultState
      }
    };

    const ownProps = {
      orders: props.orders,
      modal: props.modal,
      pagination: props.pagination,
      grandTotalPrice: props.grandTotalPrice,
      orderedMealsPagination: props.pagination
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});
