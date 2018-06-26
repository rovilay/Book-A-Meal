import React from 'react';
import PropTypes from 'prop-types';

import tableHead from '../../../helpers/tableHead';
import TableHead from '../../common/Table/TableHead';
import TableRow from '../../common/Table/ModalTableRow';

const OrderDetailsTable = (props) => {
  const { title, content } = props;
  const {
    meals: orderMeals,
    address,
    totalPrice,
    date,
    user,
    time
  } = content;
  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>
      <hr />
      <p>
        <span className="bold">Customer:</span> {user}
      </p>
      <p>
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
      </p>
      <table>
        <TableHead tableHead={tableHead.orderDetailHead} />
        <tbody className="modal-table-body">
          {
            orderMeals.map((meal, i) => {
              const {
                id,
                title: Meal,
                price: unitPrice,
                OrderMeal
              } = meal;
              const { portion } = OrderMeal;
              const price = unitPrice * portion;
              const item = {
                sn: ++i,
                Meal,
                unitPrice,
                portion,
                price
              };

              return (
                <TableRow
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

OrderDetailsTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};

export default OrderDetailsTable;
