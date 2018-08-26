import React from 'react';
import { shallow } from 'enzyme';
import SetMenuCard from '../../../../components/adminpages/dashboard/MenuCard/SetMenuCard';

const props = {
  editMenu: jest.fn(),
  getMenuMeals: jest.fn(),
  submitNewMenu: jest.fn()
}

describe('SetMenuCard component test', () => {
  const setup = () => shallow(<SetMenuCard {...props}/>);


  it('should render SetMenuCard correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });
});
