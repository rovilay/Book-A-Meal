/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

class CustomerOrder extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.onEditOrder = this.onEditOrder.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
    this.getCustomerOrders = this.getCustomerOrders.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.getCustomerOrders();
    this.hideModal();
  }

  /**
   * it sets modal up for showing order details
   * @param {object} orderDetails consist of all details about an order
   */
  onEditOrder(orderDetails) {
    const { orderId, meals } = orderDetails;
    const orderedMeals = [];
    let totalPrice = 0;

    meals.map((meal) => {
      const {
        id,
        title,
        price: unitPrice,
        OrderMeal
      } = meal;
      const { portion } = OrderMeal;
      const price = unitPrice * portion;
      totalPrice += price;
      orderedMeals.push({
        id,
        title,
        unitPrice,
        portion,
        price
      });
    });

    this.props.setModal({
      isOpen: true,
      isEdit: true,
      isInfo: false,
      close: false,
      contentLabel: 'Edit Order',
      content: { ...orderDetails }
    });

    this.props.setEditOrder({
      orderId,
      deliveryAddress: orderDetails.address,
      orderedMeals,
      totalPrice
    });
  }

  /**
   * Gets customer's orders,
   * Calls the getOrders action
   */
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

  /**
   * Show an order details
   * @param {Object} orderDetails consist of details of an order
   */
  showDetails(orderDetails) {
    this.props.setModal({
      isOpen: true,
      isInfo: true,
      isEdit: false,
      isOrderInfo: false,
      close: false,
      contentLabel: 'Order details',
      content: { ...orderDetails }
    });
  }

  deleteRow(id) {
    this.props.deleteMealInEditOrder(id);
  }

  /**
   * Updates meal portion,
   * Calls the updateMealPortion action
   *
   * @param {string} mealId id of meal to update
   * @param {number} portion new portion of meal to update
   */
  updatePortion(mealId, portion) {
    this.props.updateMealPortion({ mealId, portion });
  }

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  render() {
    const { history, grandTotalPrice } = this.props.orders;
    return (
      <div className="pull-down">
        <div className="title" id="menu-title">
          Your Order History
        </div>
        <hr />
        <div className="table-container">
          <table>
            <TableHead tableHead={tableHead.orderHead} />
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
                      onEditOrder={this.onEditOrder}
                      showDetails={this.showDetails}
                      notify={this.notify}
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
            notify={this.notify}
            {...this.props}
          />
          <ToastContainer />
        </div>
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
  getOrders: PropTypes.func.isRequired,
  setEditOrder: PropTypes.func.isRequired
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
    getOrders,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerOrder));
