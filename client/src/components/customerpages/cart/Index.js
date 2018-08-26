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

import { getFromLocalStorage } from '../../../helpers/localstorage';
import isExpired from '../../../helpers/isExpired';
import notify from '../../../helpers/notify';
import {
  emptyCart,
  deleteMealInCart,
  addMealToCart,
  updateCartMealPortion,
} from '../../../actions/cartActions';
import { postOrder } from '../../../actions/ordersActions';
import { cartTableHead } from '../../../helpers/tableHeadData';
import CartTableRow from './CartTablerow';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryAddress: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
  }

  componentDidMount() {
    const { cart, history } = this.props;

    if (cart && cart.length < 1) {
      return history.push('/dashboard');
    }
  }

  componentDidUpdate() {
    const { cart, history } = this.props;
    if (cart && cart.length < 1) {
      return history.push('/dashboard');
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Places order
   * @param {*} event DOM event
   * Sends ordered meals to server
   */
  onOrder(event) {
    event.preventDefault();
    const {
      history,
      cart,
    } = this.props;
    const { deliveryAddress } = this.state;
    const token = getFromLocalStorage('jwt');
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

  /**
   * updates cart meal portion
   * @param  {any} meal the meal to update its portion
   * @return function
   * @memberof Cart
   */
  updatePortion(meal) {
    return () => {
      const portion = document.getElementById(`portion-${meal.id}`).value;
      this.props.updateCartMealPortion({ ...meal, portion });
    };
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
        <form onSubmit={this.onOrder}>
          <div className="address">
            <label htmlFor="address">
              Address:
            </label>
            <div className="input-div">
              <input
                type="text"
                placeholder="Enter delivery address"
                name="deliveryAddress"
                id="cart-address"
                value={this.state.deliveryAddress}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className={classname('container-test', { hide: cart.length === 0 })}>
            <div className="row head">
              {
                cartTableHead.map((title, i) => (
                  <p
                    key={i}
                    className="row-item"
                  >
                    {title}
                  </p>
                ))
              }
            </div>
            {
              cart.map((meal, i) => (
                <CartTableRow
                  key={i}
                  item={meal}
                  deleteRow={this.deleteRow}
                  updatePortion={this.updatePortion}
                  sn={++i}
                  showId={false}
                  actions={{
                    delete: true,
                    info: false,
                    edit: false
                  }}
                  {...this.props}
                />
              ))
            }
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
              className="btn-2"
            >
            Place order
            </button>
          </div>
        </form>
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
  postOrder: PropTypes.func.isRequired,
  updateCartMealPortion: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  cart: state.cart.meals,
  cartTotalPrice: state.cart.totalPrice,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    emptyCart,
    deleteMealInCart,
    addMealToCart,
    postOrder,
    updateCartMealPortion,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
