import React from 'react';
import { shallow } from 'enzyme';
import { orderOnEdit, orders } from '../../../__mockData__/orderMock';
import CustomerOrderTableRow from '../../../../components/customerpages/orderPage/CustomerOrderTablerow';

const props = {
  item: {
    ...orderOnEdit,
    portion: 2
  },
  showDetails: jest.fn(),
  mealsUrl: orders[0].Meals,
  editOrder: jest.fn(),
  deleteOrder: jest.fn(),
  deleteRow: jest.fn(),
  isEdit: true,
  actions: {
    delete: true,
    info: true,
    edit: true
  },
  mealId: `${orderOnEdit.orderId}`,
  updatePortion: jest.fn(),
  orderedMealsLength: 5
};

describe('CustomerOrderTableRow component test', () => {
  const setup = () => shallow(<CustomerOrderTableRow {...props} />);


  it('should render CustomerOrderTableRow correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `cancelOrder`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    };

    const cancelOrderSpy= jest.spyOn(wrapper.instance(), 'cancelOrder');
    wrapper.instance().cancelOrder(event);
    expect(cancelOrderSpy).toHaveBeenCalled();
    done();
  });


  it('should call `updateOrderPortion`', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    '<div>' +
    `<input type="number" id="portion-${orderOnEdit.orderId}" value="2" />`
    '</div>';

    const updateOrderPortionSpy= jest.spyOn(wrapper.instance(), 'updateOrderPortion');
    wrapper.instance().updateOrderPortion();
    expect(updateOrderPortionSpy).toHaveBeenCalled();
    expect()

    done();
  });


  it('should call `deleteOrderRow`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    };

    const deleteOrderRowSpy= jest.spyOn(wrapper.instance(), 'deleteOrderRow');
    wrapper.instance().deleteOrderRow(event);
    expect(deleteOrderRowSpy).toHaveBeenCalled();

    done();
  });


  it('should call `showOrderDetails`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    };

    const showOrderDetailsSpy= jest.spyOn(wrapper.instance(), 'showOrderDetails');
    wrapper.instance().showOrderDetails(event);
    expect(showOrderDetailsSpy).toHaveBeenCalled();
    done();
  });


  it('should call `editOrders`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    };

    const editOrdersSpy= jest.spyOn(wrapper.instance(), 'editOrders');
    wrapper.instance().editOrders(event);
    expect(editOrdersSpy).toHaveBeenCalled();

    done();
  });
});
