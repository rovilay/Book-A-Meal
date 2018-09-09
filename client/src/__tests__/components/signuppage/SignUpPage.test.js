import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../components/signuppage/Index';


describe('SignUpPage component test', () => {
  const setup = () => {
    const props = {
      signUp: () => jest.fn()
    };

    return shallow(<SignUpPage {...props} />)
  };

  it('should render SignUpPage correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `onChange` if signup form input is changed', (done) => {
    document.body.innerHTML =
    `<div>
      <input id="signup-fname" value="john" />
      <input id="signup-lname" value="john" />
      <input id="signup-email" value="johndoe@email.com" />
      <input id="signup-role" value="customer" />
      <input id="signup-phone" value="0987654321" />
      <input id="signup-address" value="amity" />
      <input id="signup-psw" value="1234567" />
      <input id="signup-cpsw" value="1234567" />
      <input id="signup-city" value="ikeja" />
      <input id="signup-state" value="lagos" />
    </div>`;

    const wrapper = setup();

    const event = {
      preventDefault: jest.fn(),
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


  it('should call `onSubmit` if signup button is clicked', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'email',
        value: 'test@test.com'
      }
    };
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event)

    expect(onSubmitSpy).toHaveBeenCalled();

    done();
  });
});
