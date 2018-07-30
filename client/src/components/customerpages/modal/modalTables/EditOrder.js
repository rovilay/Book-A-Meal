/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';
import PropTypes from 'prop-types';

import tableHeadData from '../../../../helpers/tableHeadData';
import TableHead from '../../../common/Table/TableHead';
import ModalTableRow from '../../../common/Table/ModalTableRow';

const EditOrderTable = (props) => {
  const {
    title,
    editOrder,
    updateOrder,
  } = props;
  const { orderId, orderedMeals, totalPrice } = editOrder;

  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>

      <hr />

      <form onSubmit={(e) => {
        e.preventDefault();
        const deliveryAddress = document.getElementById('delivery-address').value.trim();
        const data = { deliveryAddress, meals: orderedMeals };
        updateOrder(orderId, data);
      }}
      >
        <p className="address">
          <label htmlFor="address">
            Address:
          </label>
          <input
            type="text"
            placeholder="Enter delivery address"
            name="deliveryAddress"
            id="delivery-address"
            defaultValue={editOrder.deliveryAddress}
            required
          />
        </p>
        <table>
          <TableHead tableHeadData={tableHeadData.editOrderTableHead} />
          <tbody>
            {
              orderedMeals.map((meal, i) => {
                const {
                  id,
                  title: Meal,
                  unitPrice,
                  portion,
                } = meal;
                const price = unitPrice * portion;
                const item = {
                  sn: ++i,
                  Meal,
                  unitPrice,
                  portion,
                  price
                };

                return (
                  <ModalTableRow
                    key={id}
                    item={item}
                    id={id}
                    {...props}
                  />
                );
              })
            }
          </tbody>
        </table>
        <p id="order-total-price" className="orderTot">
          Total Price(&#8358;): {totalPrice}
        </p>
        <div className="order">
          <button
            type="submit"
            name="orderbtn"
            id="order-btn"
            className="btn-1 update-order-btn"
            disabled={orderedMeals.length <= 0}
          >
            Update order
          </button>
        </div>
      </form>
    </div>
  );
};

EditOrderTable.propTypes = {
  title: PropTypes.string.isRequired,
  editOrder: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

export default EditOrderTable;