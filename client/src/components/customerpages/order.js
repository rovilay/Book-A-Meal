/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import tableHead from '../../helpers/tableHead';
import TableHead from '../common/Table/TableHead';
import TableRow from '../common/Table/OrderTableRow';
import serverReq from '../../helpers/serverReq';
import isExpired from '../../helpers/isExpired';
import { getFromLs, storeInLs } from '../../helpers/Ls';
import setCustomerOrders from '../../actions/orders';
import Footer from '../common/Footer';

class CustomerOrder extends Component {
  componentWillMount() {
    this.getOrders();
  }

  componentDidMount() {
    this.addOrdersToStore();
  }

  async getOrders() {
    const token = getFromLs('jwt');
    const { history } = this.props;
    if (token) {
      const {
        user,
        exp
      } = jwt.decode(token);

      const { id, admin } = user;
      if (!isExpired(exp) && !admin) {
        const response = await serverReq('get', `/api/v1/orders/${id}`, '', token);
        const { data } = response;
        if (data) {
          storeInLs('orders', data);
        }
      } else {
        history.push('/login');
      }
    } else {
      history.push('/login');
    }
  }

  addOrdersToStore() {
    const { dispatch } = this.props;
    const orders = getFromLs('orders');
    if (orders) {
      dispatch(setCustomerOrders({ ...orders }));
    }
  }

  render() {
    const { orders, grandTotalPrice } = this.props.orders;
    return (
      <div className="main-container">
        <div className="title" id="menu-title">
          Your Order History
        </div>
        <hr />
        <div className="container">
          {
            (grandTotalPrice)
            &&
            (
              <p>
                Grand Total: {grandTotalPrice}
              </p>
            )
          }
          <table>
            <TableHead tableHead={tableHead.customerOrderHead} />
            <tbody>
              {
                orders.map((order, i) => {
                  const { id: orderId, createdAt: date, totalPrice } = order;
                  const item = {
                      sn: ++i,
                      orderId,
                      date: moment(date).format('L'),
                      totalPrice,
                      Details: 'view details'
                    };

                  return <TableRow key={i} item={item} sn={++i} />;
                })
              }
            </tbody>
          </table>
        </div>
        <Footer />
      </div>

    );
  }
}

CustomerOrder.propTypes = {
  orders: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps)(withRouter(CustomerOrder));
