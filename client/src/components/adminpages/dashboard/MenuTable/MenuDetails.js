import React from 'react';
import PropTypes from 'prop-types';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import ModalTableRow from '../../../common/Table/ModalTableRow';

const MenuDetailsTable = (props) => {
  const { title, content } = props;
  const {
    menuDetails
  } = content;
  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>
      <hr />
      {/* <p>
        <span className="bold">Date:</span> {date}
      </p>
      <p>
        <span className="bold">Time:</span> {time}
      </p>
      <p>
        <span className="bold">Address:</span> {address}
      </p>
      <p>
        <span className="bold">Total Price (&#8358;):</span> {totalPrice}
      </p> */}
      <table>
        <TableHead tableHead={tableHead.menuDetailHead} />
        <tbody>
          {
            menuDetails.map((meal, i) => {
              const {
                id,
                title: Meal,
                price: unitPrice,
                description
              } = meal;
              const item = {
                sn: ++i,
                id,
                Meal,
                unitPrice,
                description
              };

              return (
                <ModalTableRow
                  key={i}
                  item={item}
                  sn={++i}
                  id={id}
                  {...props}
                />
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

MenuDetailsTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default MenuDetailsTable;
