/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import tableHead from '../../../helpers/tableHead';
import TableHead from '../../common/Table/TableHead';
import TableRow from '../../common/Table/ModalTableRow';

class EditOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: ''
    };

    this.updateOrder = this.updateOrder.bind(this);
    this.updateDeliveryAddress = this.updateDeliveryAddress.bind(this);
  }

  componentWillMount() {
    const { deliveryAddress } = this.props.editOrder;
    this.setState({ deliveryAddress });
  }

  updateOrder(e) {
    e.preventDefault();
  }

  updateDeliveryAddress(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const {
      title,
      // content,
      isEdit,
      editOrder
    } = this.props;
    const { orderedMeals } = editOrder;
    // const {
    //   meals: orderMeals,
    //   address,
    //   // totalPrice,
    //   // date,
    //   // time
    // } = content;

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
        {title}

        <form onSubmit={this.updateOrder}>
          <p>
            <label htmlFor="address">
              Address:
            </label>
            <input
              type="text"
              placeholder="Enter delivery address"
              name="deliveryAddress"
              id="cart-address"
              // defaultValue={deliveryAddress}
              onChange={this.updateDeliveryAddress}
              value={this.state.deliveryAddress}
              required
            />
          </p>
          <table>
            <TableHead tableHead={tableHead.cartTableHead} />
            <tbody>
              {
                orderedMeals.map((meal, i) => {
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
                      key={id}
                      item={item}
                      id={id}
                      isEdit={isEdit}
                      editOrder={editOrder}
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
              // disabled={cart.length < 1}
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
  // content: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  editOrder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default EditOrderTable;
