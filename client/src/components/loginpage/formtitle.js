import React from 'react';
import PropTypes from 'prop-types';

const FormTitle = props => (
  <div className="form-title" id="login-form-title">
    {props.title}
    <hr />
  </div>
);

FormTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default FormTitle;
