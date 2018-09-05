import React, { Component } from 'react';
import { shallow } from 'enzyme';
import mockStore from '../../__mockData__/mockStore';
import { menuMeals } from '../../__mockData__/menuMock';
import toJson from 'enzyme-to-json';
import AdminOnly from '../../../components/HOCs/AdminOnly';
import MealPage from '../../../components/adminpages/mealPage/Index'


describe('AdminOnly higher order component test', () => {
  let WrapperWithHOC;

  // create mock components
  beforeEach(() => {
    class MockComponent extends Component {
      render() {
        return (<div>Component</div>)
      }
    };

    WrapperWithHOC = AdminOnly(MockComponent);
  })

  const setup = () => {
    const props = {
      history: [],
      setDefaultNav: () => jest.fn(),
      setNav: () => jest.fn()
    };

    const store = mockStore({
      menus: {
        todayMenu: menuMeals
      }
    })

    return shallow(<WrapperWithHOC  {...props} store={store} />)
  };


  it('should return component only if admin', (done) => {
    localStorage.setItem('jwt', adminToken);
    const wrapper = setup()

    expect(toJson(wrapper)).toMatchSnapshot();

    done();
  });


  it('should return component only if admin', (done) => {
    const wrapper = setup()

    expect(toJson(wrapper)).toMatchSnapshot();

    done();
  });
});
