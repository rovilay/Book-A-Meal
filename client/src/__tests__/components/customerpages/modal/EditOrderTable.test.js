import React from 'react';
import { shallow } from 'enzyme';
import { orderOnEdit } from '../../../__mockData__/orderMock';
import EditOrderTable from '../../../../components/customerpages/modal/modalTables/EditOrderTable';

describe('EditOrderTable component test', () => {
  const setup = () => {
    const props = {
      orderedMealsPagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      getOrderMeals: () => jest.fn(),
      updateOrder: () => jest.fn(),
      title: 'Edit Order',
      editOrder: {
        ...orderOnEdit,
        UserId: '1'
      }
    };

    return shallow(<EditOrderTable {...props} />)
  };


  it('should render EditOrderTable correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` if pagination button is clicked',
  (done) => {
    const wrapper = setup();

    const data = {
      selected: 1
    };

    const handlePaginationClickSpy= jest.spyOn(
      wrapper.instance(), 'handlePaginationClick'
    );
    wrapper.instance().handlePaginationClick(data)
    expect(handlePaginationClickSpy).toHaveBeenCalled();

    done();
  });


  it('should call `submitEdit` if update order button is clicked',
  (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    document.body.innerHTML =
    '<div>' +
    '  <input type="text" id="delivery-address" value="isuti rd" />'
    '</div>';

    const submitEditSpy= jest.spyOn(wrapper.instance(), 'submitEdit');
    wrapper.instance().submitEdit(event)
    expect(submitEditSpy).toHaveBeenCalled();

    done();
  });
});
