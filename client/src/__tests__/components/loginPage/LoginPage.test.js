import React from 'react';
import { shallow } from 'enzyme';
import { userDataDefaultState } from '../../../reducers/loginReducer';
import { signUpReducersDefaultState } from '../../../reducers/signupReducer';
import { LogInPage, mapStateToProps } from '../../../components/loginpage/Index';
import LoginForm from '../../../components/loginpage/Loginform';

describe('LoginPage component test', () => {
  const setup = () => {
    const props = {
      signUpSuccess: {
        message: 'you are signed up'
      },
      setSuccessfulSignUpMsg: jest.fn(),
      onChange: jest.fn(),
      user: {
        email: 'test@test.com',
        password: '1234567'
      },
      history: {},
      loginUser: jest.fn(),
      logUserIn: jest.fn(),
      onChange: jest.fn()
    };

    return shallow(<LogInPage {...props} />)
  };

  beforeEach(() => jest.useFakeTimers());

  it('should render LoginPage correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should render connected components', (done) => {
    const props = {
      password: "1234567",
      email: "test@test.com"
    };

    const wrapper = shallow(<LoginForm {...props} />);
    expect(wrapper.length).toBe(1);

    done();
  });


  it('should call onChange if email input is changed', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    };
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(event)

    expect(onChangeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `logUserIn` function when login button is clicked', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    };

    const logUserInSpy = jest.spyOn(wrapper.instance(), 'logUserIn');
    wrapper.instance().logUserIn(event);

    expect(logUserInSpy).toHaveBeenCalled();

    done();
  });


  it('should call `componentDidMount` if component successfully mounts',
  (done) => {
    const wrapper = setup();

    const componentDidMountSpy = jest.spyOn(
      wrapper.instance(), 'componentDidMount'
    );
    wrapper.instance().componentDidMount();

    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 200)

    done();
  });


  it('should map state to props', () => {
    const initialState = {
      signUp: {
        ...signUpReducersDefaultState
      },
      login: {
        ...userDataDefaultState
      }
    };

    const ownProps = {
      user: 'ogooluwa',
      signUpSuccess: 'you are logged in'
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});
