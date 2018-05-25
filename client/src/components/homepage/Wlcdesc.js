import React from 'react';
import PropTypes from 'prop-types';

const Welcome = (props) => {
  return (
    <div className="container">
      <h1>Are you busy and hungry?</h1>
      <h2>Would you want to eat your favourite food from your favourite resturant?</h2>
      <p>Use this app to keep track of our menu and place orders at your convinience.</p>
      <p>
        <a href={props.navData[0].link}> {props.navData[0].title} </a> or
        <a href={props.navData[1].title}> {props.navData[1].title} </a> and place your order now.
      </p>
    </div>
  );
};

Welcome.propTypes = {
  navData: PropTypes.array.isRequired
};

export default Welcome;
