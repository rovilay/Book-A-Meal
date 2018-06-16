import React from 'react';
import PropTypes from 'prop-types';

import SetMenuForm from './setMenuForm';

const SetMenuCard = props => (
  <div className="setMenuCard">
    <div className="title">Set Menu</div>
    <hr />
    <SetMenuForm {...props} />
  </div>
);


// SetMenuCard.propTypes = {
//   modal: PropTypes.object.isRequired,
//   setModal: PropTypes.func.isRequired,
//   hideModal: PropTypes.func.isRequired,
// };

export default SetMenuCard;
