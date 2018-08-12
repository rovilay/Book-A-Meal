/* eslint jsx-a11y/label-has-for:0 */
/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import FontAwesome from 'react-fontawesome';
import classname from 'classnames';

import { getFromLs } from '../../helpers/Ls';
import isExpired from '../../helpers/isExpired';
import notify from '../../helpers/notify';
import {
  emptyCart,
  deleteMealInCart,
  addMealToCart,
  updateCartMealPortion
} from '../../actions/cartActions';
import { postOrder } from '../../actions/ordersActions';
import tableHeadData from '../../helpers/tableHeadData';
import TableHead from '../common/Table/TableHead';
import TableRow from '../common/Table/TableRow';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: '',
    };

    // this.setTotalPrice = this.setTotPrice.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentDidMount() {
    const { cart, history } = this.props;
    const cartInLs = getFromLs('bookAMealCart');
    const { meals: cartMeals } = cartInLs;
    if ((cart && cart.length < 1) || (cartInLs && cartMeals.length < 1)) {
      return history.push('/dashboard');
    }
  }

  componentDidUpdate() {
    const { cart, history } = this.props;
    if (cart && cart.length < 1) {
      return history.push('/dashboard');
    }
    // this.setTotPrice();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  /**
   * Places order
   * @param {*} e DOM event
   * Sends ordered meals to server
   */
  onOrder(e) {
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
        this.props.postOrder(deliveryAddress, cart);
      }
    } else {
      history.push('/login');
    }
  }

  /**
   * Deletes meal row on cart table
   *
   * @param {object} meal to delete
   *
   * Calls deleteMealInCart action
   */
  deleteRow(meal) {
    this.props.deleteMealInCart(meal);
    notify('Meal removed from cart!', 'toast-danger', 'top-center');
  }

  render() {
    const { cart, cartTotalPrice } = this.props;
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
                    cart.map((meal, i) => (
                      <TableRow
                        key={i}
                        item={meal}
                        sn={++i}
                        deleteRow={this.deleteRow}
                        onChange={this.onChange}
                        {...this.props}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="order">
              <span id="order-total-price">
                Total Price: &#8358;{cartTotalPrice}
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
        <div className={classname('empty not-found empty-cart', { hide: cart.length > 0 })}>Cart is Empty!</div>
      </section>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  deleteMealInCart: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart.meals,
  cartTotalPrice: state.cart.totalPrice,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    emptyCart,
    deleteMealInCart,
    addMealToCart,
    postOrder,
    updateCartMealPortion
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
