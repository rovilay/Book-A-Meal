import React from 'react';
import { shallow } from 'enzyme';
import { orderDetails } from '../../../__mockData__/orderMock';
import OrderDetailsTable from '../../../../components/customerpages/modal/modalTables/OrderDetailsTable';

describe('EditOrderTable component test', () => {
  const setup = () => {
    const props = {
      orderedMealsPagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      getOrderMeals: () => jest.fn(),
      title: 'Order Details',
      content: {
        ...orderDetails,
        createdAt: '2018-09-01'
      }
    };

    return shallow(<OrderDetailsTable {...props} />)
  };


  it('should render EditOrderTable correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` if pagination button is clicked', (done) => {
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
});
