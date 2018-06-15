/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import tableHead from '../../../helpers/tableHead';
import TableHead from '../../common/Table/TableHead';
import ModalTableRow from '../../common/Table/ModalTableRow';

class EditOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: ''
    };
  }

  componentWillMount() {
    const { deliveryAddress } = this.props.editOrder;
    this.setState({ deliveryAddress });
  }

  // updateDeliveryAddress(e) {
  //   this.setState({ [e.target.name]: e.target.value.trim() });
  //   console.log(document.getElementById('address').value);
  // }

  render() {
    const {
      title,
      editOrder,
      updateOrder,
    } = this.props;
    const { orderId, orderedMeals: meals } = editOrder;

    return (
      <div className="table-container">
        {/* {
          message
          &&
          <p
            id="alert"
            role="alert"
            className={classname('alert-danger', { 'alert-success': success })}
          >
            {message}
          </p>
        } */}
        <h2 className="title">
          {title}
        </h2>

        <hr />

        <form onSubmit={(e) => {
          e.preventDefault();
          const deliveryAddress = document.getElementById('delivery-address').value.trim();
          const data = { deliveryAddress, meals };
          updateOrder(orderId, data);
          console.log('order updated!');
        }}
        >
          <p>
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
            <TableHead tableHead={tableHead.editOrderTableHead} />
            <tbody>
              {
                meals.map((meal, i) => {
                  const {
                    id,
                    title: Meal,
                    unitPrice,
                    portion,
                  } = meal;
                  // const { portion } = OrderMeal;
                  // const price = unitPrice * portion;
                  const item = {
                    sn: ++i,
                    Meal,
                    unitPrice,
                    portion,
                  };

                  return (
                    <ModalTableRow
                      key={id}
                      item={item}
                      id={id}
                      {...this.props}
                    />
                  );
                })
              }
            </tbody>
          </table>

          <div className="order">
            {/* <span id="order-total-price">
              Total Price: &#8358;{totPrice}
            </span> */}
            <button
              type="submit"
              name="orderbtn"
              id="order-btn"
              className="order-btn btn-1"
            >
              Update order
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditOrderTable.propTypes = {
  title: PropTypes.string.isRequired,
  editOrder: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   editOrder: state.orders.editOrder
// });

// export default connect(mapStateToProps)(EditOrderTable);
export default EditOrderTable;

