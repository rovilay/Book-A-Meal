import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import MenuTableRow from './MenuTableRow';

class MenuTable extends Component {
  render() {
    const { menus } = this.props;
    return (
      <div className="menu_table">
        <table>
          <TableHead tableHead={tableHead.menuTableHead} />
          <tbody>
            {
              menus.map((menu, i) => {
                const {
                  id: menuId,
                  postOn,
                  User,
                } = menu;
                const item = {
                  sn: ++i,
                  menuId,
                  postOn: moment(postOn).format('LL'),
                  createdBy: `${User.firstName} ${User.lastName}`
                };
                return (<MenuTableRow
                  key={menuId}
                  item={item}
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
  menus: PropTypes.array.isRequired
};

export default MenuTable;
