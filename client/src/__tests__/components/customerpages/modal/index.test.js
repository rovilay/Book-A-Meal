import React from 'react';
import { shallow } from 'enzyme';
import { orderDetails } from '../../../__mockData__/orderMock';
import ModalComp from '../../../../components/customerpages/modal/Index';

describe('ModalComp component test', () => {
  const setup = () => {
    const props = {
      modal: {
        content: {
          ...orderDetails,
          createdAt: '2018-09-01'
        },
        contentLabel: 'Edit Order',
        isOpen: true,
        isInfo: true,
        isEdit: true
      },
      getOrderMeals: jest.fn(),
      title: 'Order Details',
      content: {
        ...orderDetails,
        createdAt: '2018-09-01'
      },
      orderedMealsPagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      setModal: jest.fn(),
      hideModal: jest.fn(),
      editOrder: jest.fn()
    };

    return shallow(<ModalComp {...props} />)
  };

  it('should render `ModalComp` correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });
});
