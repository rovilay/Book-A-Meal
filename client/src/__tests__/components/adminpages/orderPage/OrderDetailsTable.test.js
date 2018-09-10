import React from 'react';
import { shallow } from 'enzyme';
import OrderDetailsTable from '../../../../components/adminpages/orderPage/OrderDetailsTable';
import { orderDetails } from '../../../__mockData__/orderMock';


const props = {
  getOrderMeals: jest.fn(),
  title: 'Order Details',
  content: {
    ...orderDetails,
    User: {
      firstName: 'john',
      lastName: 'doe'
    },
    createdAt: '2018-09-03'
  },
  orderedMealsPagination: {
    limit: 12,
    count: 13,
    numOfPages: 2
  },
};

describe('OrderDetailsTable component test', () => {
  const setup = () => shallow(<OrderDetailsTable {...props} />);


  it('should render `OrderDetailsTable` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` if pagination button is clicked', (done) => {
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
