import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import TableCol from '../../../common/Table/TableCol';

const MenuTableRow = (props) => {
  const { item } = props;
  return (
    <tr key={item.menuId}>
      {
        Object.keys(item).map((key, i) => (
          (<TableCol dataTitle={key} val={item[key]} key={i} />)
        ))
      }

      {
        <td data-title="view details">
          <a
            role="button"
            href="#"
            // onClick={showDetails}
            className="btn-col btn-2"
          >
            <FontAwesome
              name="info-circle"
              size="2x"
            />
          </a>
          <a
            // onClick={editOrder}
            href="#"
            role="button"
            className="btn-col btn-2"
          >
            <FontAwesome
              name="edit"
              size="2x"
            />
          </a>
          <a
            // onClick={() => {
            //   deleteOrder(item.orderId);
            //   notify(orders.serverRes.message);
            // }}
            href="#"
            role="button"
            className="btn-col btn-2"
          >
            <FontAwesome
              name="times"
              size="2x"
            />
          </a>
        </td>
      }
    </tr>
  );
};

MenuTableRow.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuTableRow;
