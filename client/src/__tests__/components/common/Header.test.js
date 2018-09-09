import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapStateToProps } from '../../../components/common/Header';
import navData from '../../../helpers/navData'
import { meals } from '../../__mockData__/mealMock';


describe('Header component test', () => {
  const setup = () => {

    const props = {
      setDefaultNav: () => jest.fn(),
      logOutUser: () => jest.fn(),
      emptyCart: () => jest.fn(),
      navLinks: navData.customerNav,
      history: [],
      cart: []
    };

    return shallow(<Header {...props} />)
  };

  it('should render Header correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `onLogOut` if logout button is clicked', (done) => {
    const wrapper = setup();

    const onLogOutSpy = jest.spyOn(wrapper.instance(), 'onLogOut');
    wrapper.instance().onLogOut()


    expect(onLogOutSpy).toHaveBeenCalled();

    done();
  });


  it('should call `toggleHam` if hamburger menu is clicked on mobile',
  (done) => {
    const wrapper = setup();

    const ontoggleHamSpy = jest.spyOn(wrapper.instance(), 'toggleHam');
    wrapper.instance().toggleHam()


    expect(ontoggleHamSpy).toHaveBeenCalled();

    done();
  });


  it('should map state to props', () => {
    const initialState = {
      navLinks: [],
      cart: {
        meals: []
      }
    };

    const ownProps = {
      navLinks: navData.adminNav,
      cart: {
        meals
      }
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});