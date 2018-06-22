/* eslint jsx-a11y/label-has-for:0 */
/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import serverReq from '../../helpers/serverReq';
import { getFromLs } from '../../helpers/Ls';
import isExpired from '../../helpers/isExpired';
import { emptyCart, deleteMealInCart } from '../../actions/cart';
import { orderServerRes } from '../../actions/orders';
import tableHead from '../../helpers/tableHead';
import TableHead from '../common/Table/TableHead';
import TableRow from '../common/Table/TableRow';
import setCartTotalPrice from '../../actions/cartTotPr';
import Footer from '../common/Footer';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: '',
    };

    this.setTotalPrice = this.setTotPrice.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.notify = this.notify.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentWillMount() {
    const { cart, history } = this.props;
    if (cart.length < 1) {
      history.push('/dashboard');
    }
  }

  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length < 1) {
      return history.push('/dashboard');
    }

    this.setTotPrice();
  }

  componentDidUpdate() {
    this.setTotPrice();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Places order
   * @param {*} e DOM event
   * Sends ordered meals to server
   */
  async onOrder(e) {
    e.preventDefault();
    const {
      history,
      cart,
    } = this.props;
    const { deliveryAddress } = this.state;
    const token = getFromLs('jwt');
    if (token) {
      const {
        admin,
        exp
      } = jwt.decode(token);

      if (!isExpired(exp) && !admin && cart.length > 0) {
        const response = await serverReq('post', '/api/v1/orders', { deliveryAddress, meals: cart }, token);
        const { success, message } = response.data;
        this.props.orderServerRes({ success, message });
        this.notify(this.props.serverRes.message);
        this.props.emptyCart();
      }
    } else {
      history.push('/login');
    }
  }

  /**
   * Calculates total price of meals in cart,
   * Call setCartTotalPrice action to add total price to redux store
   */
  setTotPrice() {
    let totPrice = 0;
    this.props.cart.map((meal) => {
      const { unitPrice, portion } = meal;
      if (unitPrice && portion) {
        totPrice += (unitPrice * portion);
      }
    });

    this.props.setCartTotalPrice(totPrice);
  }

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  /**
   * Deletes meal row on cart table
   *
   * @param {number} sn serial number of meal on table
   *
   * Calls deleteMealInCart action
   */
  deleteRow(sn) {
    const id = sn - 1;
    this.props.deleteMealInCart(id);
    this.notify('Meal deleted successfully!');
  }

  render() {
    const { cart, totPrice } = this.props;
    return (
      <div className="main-container">
        <div className="title" id="cart-title">
          Your Cart
        </div>
        <hr />
        <div className="table-container">
          <form onSubmit={this.onOrder}>
            <p>
              <label htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                placeholder="Enter delivery address"
                name="deliveryAddress"
                id="cart-address"
                value={this.state.deliveryAddress}
                onChange={this.onChange}
                required
              />
            </p>
            <table>
              <TableHead tableHead={tableHead.cartTableHead} />
              <tbody>
                {
                  cart.map((meal, i) => {
                    const price = meal.unitPrice * meal.portion;
                    const item = {
                      ...meal,
                      price
                    };
                    return (
                      <TableRow
                        key={i}
                        item={item}
                        sn={++i}
                        deleteRow={this.deleteRow}
                      />
                    );
                  })
                }
              </tbody>
            </table>

            <div className="order">
              <span id="order-total-price">
                Total Price: &#8358;{totPrice}
              </span>
              <button
                type="submit"
                name="orderbtn"
                id="order-btn"
                disabled={cart.length < 1}
                className="order-btn update-btn btn-1"
              >
              Place order
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  totPrice: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  orderServerRes: PropTypes.func.isRequired,
  serverRes: PropTypes.object.isRequired,
  deleteMealInCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  setCartTotalPrice: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart,
  totPrice: state.cartTotalPrice,
  serverRes: state.orders.serverRes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setCartTotalPrice,
    emptyCart,
    deleteMealInCart,
    orderServerRes
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
