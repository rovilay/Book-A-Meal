/* eslint jsx-a11y/label-has-for:0 */
/* eslint react/destructuring-assignment: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classname from 'classnames';
import validator from 'validator';

const SignUpForm = props => (
  <div className="signup-card">
    {
      (props.formValues.message && !props.formValues.message.includes('password'))
      && (
        <p
          id="alert"
          role="alert"
          className={classname('alert-danger', { 'alert-success': props.formValues.success })}
        >
          {props.formValues.message}
        </p>
      )
    }
    <div className="form-title" id="signup-form-title">
      SignUp
    </div>
    <hr />
    <form id="signup" className="signup-form" onSubmit={e => props.submit(e)}>
      <p>
        <label htmlFor="firstName">
          First name
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter first name"
          name="firstName"
          id="signup-fname"
          value={props.formValues.firstName}
          onChange={e => props.change(e)}
          required
        />
        {
          (props.formValues.firstName && !validator.isAlpha(props.formValues.firstName))
          && (
            <span
              id="alert"
              role="alert"
              className="alert-danger"
            >
              First name is invalid
            </span>
          )
        }
      </p>

      <p>
        <label htmlFor="lastName">
          Last name
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter last name"
          name="lastName"
          id="signup-lname"
          value={props.formValues.lastName}
          onChange={e => props.change(e)}
          required
        />
        {
          (props.formValues.lastName && !validator.isAlpha(props.formValues.lastName))
          && (
            <span
              id="alert"
              role="alert"
              className="alert-danger"
            >
              Last name is invalid
            </span>
          )
        }
      </p>

      <p className="full">
        <label htmlFor="email">
          Email
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="email"
          placeholder="Enter email"
          id="signup-email"
          name="email"
          value={props.formValues.email}
          onChange={e => props.change(e)}
          required
        />
        {
          (props.formValues.email && !validator.isEmail(props.formValues.email))
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            email is invalid
          </span>
        }
      </p>
      <p className="full">
        <label htmlFor="role">
          Role
          <span className="asterik">
          *
          </span>
        </label>
        <select name="admin" id="signup-role" onChange={e => props.change(e)} required>
          <option value="">
            Choose role
          </option>
          <option value="true">
          Caterer
          </option>
          <option value="false">
          Customer
          </option>
        </select>
        {
          (props.formValues.message && !props.formValues.message.includes('role'))
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            Role must be choosen
          </span>
        }
      </p>
      <p>
        <label htmlFor="Phone">
          Phone
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          placeholder="Enter phone number"
          name="Phone"
          id="signup-phone"
          value={props.formValues.Phone}
          onChange={e => props.change(e)}
          required
        />
      </p>

      <p>
        <label htmlFor="address">
          Address
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          id="signup-address"
          placeholder="Enter permanent address"
          name="address"
          value={props.formValues.address}
          onChange={e => props.change(e)}
          required
        />
      </p>

      <p>
        <label htmlFor="city">
          City
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          id="signup-city"
          placeholder="Enter City"
          name="city"
          value={props.formValues.city}
          onChange={e => props.change(e)}
          required
        />
        {
          (props.formValues.city && !validator.isAlpha(props.formValues.city))
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            city is not valid
          </span>
        }
      </p>

      <p>
        <label htmlFor="state">
          State
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="text"
          id="signup-state"
          placeholder="Enter State"
          name="state"
          value={props.formValues.state}
          onChange={e => props.change(e)}
          required
        />
        {
          (props.formValues.state && !validator.isAlpha(props.formValues.state))
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            state is invalid
          </span>
        }
      </p>

      <p>
        <label htmlFor="password">
          Password
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="password"
          id="signup-psw"
          placeholder="Enter Password"
          name="password"
          value={props.formValues.password}
          onChange={e => props.change(e)}
          required
        />
        {
          (
            (props.formValues.cpassword || props.formValues.password)
            &&
            props.formValues.cpassword !== props.formValues.password
          )
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            password do not match!
          </span>
        }
      </p>

      <p>
        <label htmlFor="cpassword">
          Confirm Password
          <span className="asterik">
          *
          </span>
        </label>
        <input
          type="password"
          id="signup-cpsw"
          placeholder="Confirm Password"
          name="cpassword"
          value={props.formValues.cpassword}
          onChange={e => props.change(e)}
          required
        />
        {
          (
            (props.formValues.cpassword || props.formValues.password)
            &&
            props.formValues.cpassword !== props.formValues.password
          )
          &&
          <span
            id="alert"
            role="alert"
            className="alert-danger"
          >
            password do not match!
          </span>
        }
      </p>
      <p className="full">
        <button
          type="submit"
          name="signupbtn"
          id="signupbtn"
          className="signupbtn btn-1"
          disabled={!props.formValues.isValid}
        >
          Sign Up
        </button>
      </p>
    </form>
    <p>
      <Link className="link" to="/Login">
      Click Here! to Log in
      </Link>
    </p>
    {
    (props.formValues.message && !props.formValues.message.includes('password'))
    &&
    <p
      id="alert"
      role="alert"
      className={classname('alert-danger', { 'alert-success': props.formValues.success })}
    >
      {props.formValues.message}
    </p>
  }

    {
      props.formValues.redirect && <Redirect to="/login" />
    }
  </div>
);

SignUpForm.propTypes = {
  formValues: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default connect()(SignUpForm);
