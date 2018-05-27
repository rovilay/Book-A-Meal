import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Welcome = () => (
  <div className="desc-container">
    <h1>Are you busy and hungry?</h1>
    <h2>Would you want to eat your favourite food from your favourite resturant?</h2>
    <p>Use this app to keep track of our menu and place orders at your convinience.</p>
    <p>
      <Link to="/Login"> Login </Link> or
      <Link to="/Signup"> Sign Up</Link> and place your order now.
    </p>
  </div>
);


export default Welcome;
