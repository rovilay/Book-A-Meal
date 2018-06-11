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
      // portion:
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
    console.log('order Updated');
  }

  updateDeliveryAddress(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
    // console.log(this.state.deliveryAddress);
  }

  render() {
    const {
      title,
      // content,
      isEdit,
      editOrder
    } = this.props;
    const { orderedMeals } = editOrder;

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
                    unitPrice,
                    portion,
                    price
                  } = meal;
                  // const { portion } = OrderMeal;
                  // const price = unitPrice * portion;
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
  isEdit: PropTypes.bool.isRequired,
  editOrder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   editOrder: state.orders.editOrder
// });

// export default connect(mapStateToProps)(EditOrderTable);
export default EditOrderTable;

