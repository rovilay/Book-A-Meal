import React from 'react';
import { shallow } from 'enzyme';
import CustomerDashboard from '../../../components/customerpages/Dashboard';
import { menuMeals } from '../../__mockData__/menuMock';
import { user } from '../../__mockData__/userMock';

describe('CustomerDashboard component test', () => {
  const setup = () => {
    const props = {
      pagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      token: customerToken,
      user: { ...user, admin: false },
      todayMenu: menuMeals,
      getTodayMenu: () => jest.fn(),
      history: [],
      setNav: () => jest.fn()
    };

    return shallow(<CustomerDashboard {...props} />)
  };


  it('should render `CustomerDashboard` correctly', (done) => {
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

    const handlePaginationClickSpy= jest.spyOn(wrapper.instance(), 'handlePaginationClick');
    wrapper.instance().handlePaginationClick(data)
    expect(handlePaginationClickSpy).toHaveBeenCalled();

    done();
  });
});
