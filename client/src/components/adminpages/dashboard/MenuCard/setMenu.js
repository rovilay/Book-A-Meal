import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import SetMenuForm from './SetMenuForm';

const SetMenuCard = props => (
  <AccordionItem>
    <AccordionItemTitle>
      <h3>
        <span className="postOn">Create Menu</span>
      </h3>
      <FontAwesome
        name="chevron-down"
      />
    </AccordionItemTitle>

    <AccordionItemBody>
      <div className="setMenuCard">
        <hr />
        <SetMenuForm {...props} />
      </div>
    </AccordionItemBody>
  </AccordionItem>
);

export default SetMenuCard;
