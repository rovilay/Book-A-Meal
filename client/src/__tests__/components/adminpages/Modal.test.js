import React from 'react';
import { shallow } from 'enzyme';
import ModalComp from '../../../components/adminpages/Modal/Index';
import { menuMeals, menus } from '../../__mockData__/menuMock';


const props = {
  modal: {
    isOpen: true,
    isEdit: true,
    isOrderInfo: true,
    contentLabel: 'Modal',
    content: {
      menuId: menus[0].id,
      meals: menuMeals.slice(0, 2)
    }
  },
  meals: menuMeals,
  deleteMealInEditMenu: jest.fn(),
  editMenuMeals: jest.fn(),
  addMealInEditMenu: jest.fn(),
  updateMenu: jest.fn(),
  orderedMealsPagination: {},
  setModal: jest.fn(),
  hideModal: jest.fn(),
  emptyEditMenu: jest.fn(),
};

describe('ModalComp component test', () => {
  const setup = () => shallow(<ModalComp {...props} />);


  it('should render ModalComp correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });
});
