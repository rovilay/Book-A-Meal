import React from 'react';
import { shallow } from 'enzyme';
import mockStore from '../../../__mockData__/mockStore';
import { Cart, mapStateToProps } from '../../../../components/customerpages/cart/Index';
import { cartDefaultState } from '../../../../reducers/cartReducer';
import CartTableRow from '../../../../components/customerpages/cart/CartTablerow';
import { orders, orderMeals } from '../../../__mockData__/orderMock';


describe('CustomerDashboard component test', () => {
  const setup = () => {
    const props = {
      cart: orders,
      cartTotalPrice: 1100,
      history: {},
      deleteMealInCart: () => jest.fn(),
      emptyCart: () => jest.fn(),
      postOrder: () => jest.fn(),
    };

    return shallow(<Cart {...props} />)
  };


  it('should render `Cart` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `onOrder`', (done) => {
    localStorage.setItem('jwt', customerToken)
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    };

    const onOrderSpy= jest.spyOn(wrapper.instance(), 'onOrder');
    wrapper.instance().onOrder(event)
    expect(onOrderSpy).toHaveBeenCalled();

    done();
  });


  it('should call `onChange`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'deliveryAddress',
        value: 'isuti road'
      }
    };

    const onChangeSpy= jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `onChange`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'deliveryAddress',
        value: 'isuti road'
      }
    };

    const onChangeSpy= jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)
    expect(onChangeSpy).toHaveBeenCalled();

    done();
  });

  it('should call `deleteRow`', (done) => {
    const wrapper = setup();

    const deleteRowSpy= jest.spyOn(wrapper.instance(), 'deleteRow');
    wrapper.instance().deleteRow(orderMeals[0])
    expect(deleteRowSpy).toHaveBeenCalled();

    done();
  });


  it('should call `updatePortion`', (done) => {
    const wrapper = setup();

    const updatePortionSpy= jest.spyOn(wrapper.instance(), 'updatePortion');
    wrapper.instance().updatePortion(orderMeals[0])
    expect(updatePortionSpy).toHaveBeenCalled();

    done();
  });


  it('should render connected components', (done) => {
    const props = {
      item: orderMeals[0],
      removeMeal: () => jest.fn(),
      actions: {
        delete: true,
        info: false,
        edit: false
      },
      updatePortion: () => jest.fn(),
      sn: 1
    };

    const wrapper = shallow(<CartTableRow {...props}  />);
    expect(wrapper.length).toBe(1);

    done()
  });

  it('should map state to props', () => {
    const initialState = {
      cart: {
        ...cartDefaultState
      }
    };

    const ownProps = {
      cart: orderMeals,
      cartTotalPrice: 1100
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});
