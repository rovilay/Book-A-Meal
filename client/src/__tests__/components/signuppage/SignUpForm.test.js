import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../components/signuppage/Signupform';


describe('SignUpForm component test', () => {
  const setup = () => {
    const props = {
      submit: () => jest.fn(),
      formValues: {
        firstName: 'ogoolu0wa',
        lastName: 'akino9la',
        email: 'test@testcom',
        password: '1234567',
        cpassword: '123456',
        address: 'ad8b',
        address2: '',
        Phone: '09807688767',
        Phone2: '',
        city: 'ikj9',
        state: 'lag0',
        message: 'role must be chosen',
        admin: true,
        isValid: false,
        response: {}
      },
      change: () => jest.fn()
    };

    return shallow(<SignUpForm {...props} />)
  };

  it('should render SignUpPage correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });
});
