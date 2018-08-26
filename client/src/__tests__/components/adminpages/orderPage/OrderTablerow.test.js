import React from 'react';
import { shallow } from 'enzyme';
import OrderTablerow from '../../../../components/adminpages/orderPage/OrderTablerow';
import { orderDetails } from '../../../__mockData__/orderMock';


const props = {
  item: {
    ...orderDetails
  },
  showDetails: jest.fn(),
  mealsUrl: 'orders/1/meals',
  actions: {
    delete: true,
    info: true,
    edit: true
  }
};

describe('OrderTablerow component test', () => {
  const setup = () => shallow(<OrderTablerow {...props} />);


  it('should render `OrderTablerow` correctly', (done) => {
    const wrapper = setup();

    wrapper.find('.btn-3').simulate('click');
    expect(wrapper).toMatchSnapshot();
    expect(props.showDetails).toHaveBeenCalled();

    done();
  });
});
