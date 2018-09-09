import React from 'react';
import { shallow } from 'enzyme';
import SetMenuForm from '../../../../components/adminpages/dashboard/MenuCard/SetMenuForm';
import { menuMeals } from '../../../__mockData__/menuMock';

const props = {
  submitNewMenu: jest.fn(),
  newMenuMeals: menuMeals,
  meals: [],
  mealPagination: {},
  setNewMenuMeal: jest.fn()
};

describe('SetMenuForm component test', () => {
  const setup = () => {
    return shallow(<SetMenuForm {...props} />)
  };


  it('should render SetMenuForm correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `submitNewMenu` on create menu form submition', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    }
    wrapper.find(`.setmenu-form`).first().simulate('submit', event);
    expect(props.submitNewMenu).toHaveBeenCalled()

    done();
  });
});
