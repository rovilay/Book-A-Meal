/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import classname from 'classnames';

import '../../assests/css/cart.css';
import serverReq from '../../helpers/serverReq';
import { getFromLs } from '../../helpers/Ls';
import isExpired from '../../helpers/isExpired';
import { emptyCart } from '../../actions/cart';
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
      message: '',
      success: false
    };

    this.setTotalPrice = this.setTotPrice.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOrder = this.onOrder.bind(this);
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
  }

  componentDidUpdate() {
    this.setTotPrice();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onOrder(e) {
    e.preventDefault();
    const { dispatch, history, cart } = this.props;
    const { deliveryAddress } = this.state;
    const token = getFromLs('jwt');
    if (token) {
      const {
        user,
        exp
      } = jwt.decode(token);

      if (!isExpired(exp) && !user.admin && cart.length > 0) {
        const response = await serverReq('post', '/api/v1/orders', { deliveryAddress, meals: cart }, token);
        const { success, message } = response.data;
        this.setState({ success, message });
        dispatch(emptyCart());
      }
    } else {
      history.push('/login');
    }
  }

  setTotPrice() {
    const { cart, dispatch } = this.props;
    let totPrice = 0;
    cart.map((meal) => {
      const { unitPrice, portion } = meal;
      if (unitPrice && portion) {
        totPrice += (unitPrice * portion);
      }
    });

    dispatch(setCartTotalPrice(totPrice));
  }

  render() {
    const { cart, totPrice } = this.props;
    const {
      message,
      success
    } = this.state;
    return (
      <div className="main-container">
        <div className="title" id="cart-title">
          Your Cart
        </div>
        <hr />
        <div className="table-container">
          {
            message
            &&
            <p
              id="alert"
              role="alert"
              className={classname('alert-danger', { 'alert-success': success })}
            >
              {message}
            </p>
          }

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
                  cart.map((meal, i) => <TableRow key={i} item={meal} sn={++i} />)
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
                className="order-btn btn-1"
              >
              Place order
              </button>
            </div>
          </form>
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  totPrice: state.cartTotalPrice
});

export default connect(mapStateToProps)(withRouter(Cart));
