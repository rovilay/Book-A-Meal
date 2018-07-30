import React from 'react';
import PropTypes from 'prop-types';

import tableHeadData from '../../../../helpers/tableHeadData';
import TableHead from '../../../common/Table/TableHead';
import MenuTableRow from './MenuTableRow';

const MenuTable = props => (
  <table>
    <TableHead tableHeadData={tableHeadData.menuTableHead} />
    <tbody>
      {
        props.menus.map((menu, i) => {
          const {
            id: menuId,
            postOn,
            User,
            Meals
          } = menu;
          const item = {
            sn: ++i,
            menuId,
            postOn,
            createdBy: `${User.firstName} ${User.lastName}`,
            Meals
          };
          return (<MenuTableRow
            key={menuId}
            item={item}
            {...props}
          />);
        })
      }
    </tbody>
  </table>
);


MenuTable.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default MenuTable;
