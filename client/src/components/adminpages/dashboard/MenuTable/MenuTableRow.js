import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import TableCol from '../../../common/Table/TableCol';

const MenuTableRow = (props) => {
  const { item, showMenuDetails, editMenu } = props;
  const menu = {
    sn: item.sn,
    menuId: item.menuId,
    postOn: moment(item.postOn).format('LL'),
    createdBy: item.createdBy,
  };
  const today = new Date();

  return (
    <tr key={menu.menuId}>
      {
        Object.keys(menu).map((key, i) => (
          (<TableCol dataTitle={key} val={menu[key]} key={i} />)
        ))
      }

      {
        <td data-title="view details">
          <a
            role="button"
            href="#"
            onClick={() => {
              showMenuDetails(item.Meals);
            }}
            className="btn-col btn-2"
          >
            <FontAwesome
              name="info-circle"
              size="2x"
            />
          </a>
          {
            // (moment(moment().format('LL'), 'MMMM DD, YYYY').isSameOrBefore(item.postOn))
            // &&
            <a
              onClick={() => {
                const { menuId, postOn, Meals: meals } = item;
                editMenu({ menuId, postOn, meals });
              }}
              href="#"
              role="button"
              className="btn-col btn-2"
            >
              <FontAwesome
                name="edit"
                size="2x"
              />
            </a>
          }
        </td>
      }
    </tr>
  );
};

MenuTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  showMenuDetails: PropTypes.func.isRequired,
  editMenu: PropTypes.func.isRequired
};

export default MenuTableRow;
