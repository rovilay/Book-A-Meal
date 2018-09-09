import React from 'react';
import { shallow } from 'enzyme';
import mockStore from '../__mockData__/mockStore';
import { HomePage, mapStateToProps } from '../../components/Homepage';
import { userDataDefaultState } from '../../reducers/loginReducer';
import { menuDefaultState } from '../../reducers/menuReducer';
import { menuMeals } from '../__mockData__/menuMock';
import Menu from '../../components/common/Menu';

describe('Homepage component test', () => {
  const setup = () => {
    const props = {
      pagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      todayMenu: menuMeals,
      getTodayMenu: jest.fn(),
      history: [],
      setDefaultNav: jest.fn()
    };

    return shallow(<HomePage {...props} />)
  };


  it('should render Homepage correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should render connected components', (done) => {
    const props = {
      menu: menuMeals
    };

    const store = mockStore({
      menus: {
        todayMenu: menuMeals
      }
    })

    const wrapper = shallow(<Menu {...props} store={store} />);
    expect(wrapper.length).toBe(1);

    done()
  });


  it('should push to history if either login or sign up button is clicked',
    (done) => {
      const wrapper = setup();

      wrapper.find('button').first().simulate('click');
      wrapper.find('button').last().simulate('click');
      expect(wrapper.instance().props.history.length).toEqual(2);
      expect(wrapper.instance().props.history[0]).toEqual('/login');
      expect(wrapper.instance().props.history[1]).toEqual('/signup');

      done();
  });

  it('should map state to props', () => {
    const initialState = {
      login: {
        ...userDataDefaultState
      },
      menu: {
        ...menuDefaultState
      }
    };

    const ownProps = {
      user: 'ogooluwa',
      todayMenu: menuMeals,
      pagination: {
        limit: 12,
        offset: 0,
        count: 13,
        nextOffset: 12
      }
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })

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
