import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import MenuTableRow from './MenuTableRow';

class MenuTable extends Component {
  render() {
    const sortedMenus = this.props.menus.sort((a, b) => new Date(b.postOn) - new Date(a.postOn));
    return (
      <div className="menu_table">
        <table>
          <TableHead tableHead={tableHead.menuTableHead} />
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
                  {...this.props}
                />);
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

MenuTable.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default MenuTable;
