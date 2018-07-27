/* eslint jsx-a11y/label-has-for:0 */
/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import FontAwesome from 'react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classname from 'classnames';

import serverReq from '../../helpers/serverReq';
import { getFromLs } from '../../helpers/Ls';
import isExpired from '../../helpers/isExpired';
import { emptyCart, deleteMealInCart, addMealToCart } from '../../actions/cartAction';
import { orderServerRes } from '../../actions/ordersAction';
import tableHeadData from '../../helpers/tableHeadData';
import TableHead from '../common/Table/TableHead';
import TableRow from '../common/Table/TableRow';
import setCartTotalPrice from '../../actions/cartTotPr';

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

  // componentWillMount() {
  //   const { cart, history } = this.props;
  //   if (cart.length < 1) {
  //     history.push('/dashboard');
  //   }
  // }

  componentDidMount() {
    // const { cart, history } = this.props;
    // if (cart && cart.length < 1) {
    //   return history.push('/dashboard');
    // }

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
    this.notify('Meal removed from cart!');
  }

  render() {
    const { cart, totPrice } = this.props;
    return (
      <section className="cartpage">
        <div className="title merienda" id="cart-title">
          <div>
            <FontAwesome
              id="mobile-menu"
              name="cart-arrow-down"
            />
          </div>
          <h1>Your Cart</h1>
        </div>
        <hr />
        <div className={classname('table-container', { hide: cart.length === 0 })}>
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
            <div className="res-container">
              <table>
                <TableHead tableHeadData={tableHeadData.cartTableHead} />
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
                          onChange={this.onChange}
                          {...this.props}
                        />
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="order">
              <span id="order-total-price">
                Total Price: &#8358;{totPrice}
              </span>
              <button
                type="submit"
                name="orderbtn"
                id="order-btn"
                disabled={cart.length < 1}
                className="order-btn btn-1"
              >
              Place order
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
        <div className={classname('empty not-found empty-cart', { hide: cart.length > 0 })}>Cart is Empty!</div>
      </section>
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
    orderServerRes,
    addMealToCart
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
