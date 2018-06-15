/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import '../../assets/css/table.css';
import Modal from '../common/modal';
import tableHead from '../../helpers/tableHead';
import TableHead from '../common/Table/TableHead';
import OrderTableRow from '../common/Table/OrderTableRow';
import serverReq from '../../helpers/serverReq';
import isExpired from '../../helpers/isExpired';
import { getFromLs, storeInLs } from '../../helpers/Ls';
import { setCustomerOrders } from '../../actions/orders';
import setModal from '../../actions/modal';
import Footer from '../common/Footer';

class CustomerOrder extends Component {
  componentDidMount() {
    this.getOrders();
    this.addOrdersToStore();
    this.hideModal();
  }

  async getOrders() {
    const token = getFromLs('jwt');
    const { history } = this.props;
    if (token) {
      const {
        id,
        admin,
        exp
      } = jwt.decode(token);

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

  hideModal() {
    const { dispatch } = this.props;
    dispatch(setModal({
      isOpen: false,
      isEdit: false,
      isInfo: false,
      close: true,
      contentLabel: '',
    }));
  }

  addOrdersToStore() {
    const { dispatch } = this.props;
    const orders = getFromLs('orders');
    if (orders) {
      dispatch(setCustomerOrders({ ...orders }));
    }
  }

  render() {
    const { history, grandTotalPrice } = this.props.orders;
    return (
      <div className="main-container">
        <div className="title" id="menu-title">
          Your Order History
        </div>
        <hr />
        <div className="table-container">
          <table>
            <TableHead tableHead={tableHead.customerOrderHead} />
            <tbody>
              {
                history.map((order, i) => {
                  const {
                    id: orderId,
                    createdAt: date,
                    totalPrice,
                    deliveryAddress: address,
                    Meals: meals
                  } = order;

                  const time = moment(date).format('HH:mm');

                  const item = {
                      sn: ++i,
                      orderId,
                      date: moment(date).format('LL'),
                      totalPrice,
                    };

                  const orderDetails = {
                    orderId,
                    meals,
                    address,
                    totalPrice,
                    time,
                    date: moment(date).format('LL')
                  };

                  return (
                    <OrderTableRow
                      key={i}
                      item={item}
                      sn={++i}
                      orderDetails={orderDetails}
                    />
                  );
                })
              }
            </tbody>
          </table>
          {
            (grandTotalPrice >= 0)
            &&
            (
              <p>
                Grand Total (&#8358;): {grandTotalPrice}
              </p>
            )
          }
          <Modal />
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
