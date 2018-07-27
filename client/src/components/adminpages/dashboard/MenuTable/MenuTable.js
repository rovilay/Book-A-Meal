import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHeadData from '../../../../helpers/tableHeadData';
import TableHead from '../../../common/Table/TableHead';
import MenuTableRow from './MenuTableRow';

const MenuTable = (props) => {
  const sortedMenus = props.filteredMenus.sort((a, b) => new Date(b.postOn) - new Date(a.postOn));
  return (
    <table>
      <TableHead tableHeadData={tableHeadData.menuTableHead} />
      <tbody>
        {
          sortedMenus.map((menu, i) => {
            const {
              id: menuId,
              postOn,
              User,
              Meals
            } = menu;
            const item = {
              sn: ++i,
              menuId,
              postOn: moment(postOn).format('LL'),
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
};

MenuTable.propTypes = {
  filteredMenus: PropTypes.array.isRequired,
};

export default MenuTable;
