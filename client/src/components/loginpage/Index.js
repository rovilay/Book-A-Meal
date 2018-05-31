import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setSuccessfulSignUpMsg from '../../actions/signup';
import Form from './form';
import Footer from '../common/Footer';
import '../../assests/css/login.css';


class LogInPage extends Component {
  componentDidMount() {
    setTimeout(
      () => {
        this.props.dispatch(setSuccessfulSignUpMsg(''));
      },
      5000
    );
  }

  render() {
    const { signUpSuccess, dispatch } = this.props;
    return (
      <div className="main-container">
        <section id="section-a" className="grid">
          <div className="login-form-container">
            {
              signUpSuccess.message
              &&
              <p
                id="alert"
                role="alert"
                className="alert-success"
              >
                {signUpSuccess.message}
              </p>
            }
            <p>
              <Link to="/SignUp">
                Click Here to SignUp!
              </Link>
            </p>

            <Form dispatch={dispatch} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

LogInPage.propTypes = {
  signUpSuccess: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signUpSuccess: state.signUp.signUpSuccess
});

export default connect(mapStateToProps)(LogInPage);
