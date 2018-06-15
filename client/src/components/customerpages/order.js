/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import '../../assets/css/table.css';
import Modal from '../common/modal';
import tableHead from '../../helpers/tableHead';
import TableHead from '../common/Table/TableHead';
import OrderTableRow from '../common/Table/OrderTableRow';
import isExpired from '../../helpers/isExpired';
import { getFromLs } from '../../helpers/Ls';
import {
  setCustomerOrders,
  deleteMealInEditOrder,
  updateMealPortion,
  updateOrder,
  setEditOrder,
  deleteOrder,
  getOrders
} from '../../actions/orders';
import setModal from '../../actions/modal';
import Footer from '../common/Footer';

class CustomerOrder extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
    this.getCustomerOrders = this.getCustomerOrders.bind(this);
  }
  componentDidMount() {
    this.getCustomerOrders();
    // this.addOrdersToStore();
    this.hideModal();
  }

  getCustomerOrders() {
    const token = getFromLs('jwt');
    const { history } = this.props;
    if (token) {
      const {
        id,
        admin,
        exp
      } = jwt.decode(token);

      if (!isExpired(exp) && !admin) {
        this.props.getOrders(id);
      } else {
        history.push('/login');
      }
    } else {
      history.push('/login');
    }
  }

  hideModal() {
    this.props.setModal({
      isOpen: false,
      isEdit: false,
      isInfo: false,
      close: true,
      contentLabel: '',
    });
  }

  // addOrdersToStore() {
  //   const orders = getFromLs('orders');
  //   if (orders) {
  //     this.props.setCustomerOrders({ ...orders });
  //   }
  // }

  deleteRow(id) {
    this.props.deleteMealInEditOrder(id);
    console.log('row deleted');
  }


  updatePortion(mealId, portion) {
    this.props.updateMealPortion({ mealId, portion });
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
                      {...this.props}
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
          <Modal
            hideModal={this.hideModal}
            deleteRow={this.deleteRow}
            updatePortion={this.updatePortion}
            {...this.props}
          />
        </div>
        <Footer />
      </div>

    );
  }
}

CustomerOrder.propTypes = {
  orders: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  deleteMealInEditOrder: PropTypes.func.isRequired,
  updateMealPortion: PropTypes.func.isRequired,
  setCustomerOrders: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders,
  modal: state.modal,
  editOrder: state.orders.editOrder,
  userId: state.login.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModal,
    updateOrder,
    deleteMealInEditOrder,
    updateMealPortion,
    setCustomerOrders,
    setEditOrder,
    deleteOrder,
    getOrders
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerOrder));
