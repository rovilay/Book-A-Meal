import React from 'react';

import SetMenuForm from './setMenuForm';

const SetMenuCard = props => (
  <div className="setMenuCard">
    <div className="menu-title">Set Menu</div>
    <hr />
    <SetMenuForm {...props} />
  </div>
);

export default SetMenuCard;
