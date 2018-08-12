/* eslint class-methods-use-this:0 */
/* eslint max-len:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import Modal from './modal/Index';
import { orderHead } from '../../helpers/tableHeadData';
import TableHead from '../common/Table/TableHead';
import OrderTableRow from '../common/Table/OrderTableRow';
import isExpired from '../../helpers/isExpired';
import navData from '../../helpers/navData';
import { getFromLs } from '../../helpers/Ls';
import filterify from '../../helpers/filterify';
import summer from '../../helpers/summer';
import {
  deleteMealInEditOrder,
  updateOrder,
  updateOrderedMealPortion,
  setEditOrder,
  deleteOrder,
  getOrders
} from '../../actions/ordersActions';
import setFilter from '../../actions/filterActions';
import { setModal } from '../../actions/modalActions';
import Filter from '../common/Filter';

class CustomerOrder extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.onEditOrder = this.onEditOrder.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
    this.getCustomerOrders = this.getCustomerOrders.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.customerNav);
    this.getCustomerOrders();
    this.props.setFilter({ filter: 'all' });
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
   * Calls the  action
   *
   * @param {string} mealId id of meal to update
   * @param {number} portion new portion of meal to update
   */
  updatePortion(mealId, portion) {
    this.props.updateOrderedMealPortion({ mealId, portion });
  }

  render() {
    const { orders } = this.props;
    const grandTotalPrice = summer(orders, 'totalPrice');
    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
      <section className="cartpage orderpage">
        <div className="title merienda" id="">
          Your Order History
        </div>
        <hr />
        <div className="table-container">
          <Filter
            {...this.props}
            tableContent="customer_orders"
          />
          {
            (orders.length === 0)
              ?
                <p className="empty not-found">No orders found!</p>
              :
              (
                <div className="res-container">
                  <table>
                    <TableHead tableHeadData={orderHead} />
                    <tbody>
                      {
                        sortedOrders.map((order, i) => {
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
                              orderCreatedAt={order.createdAt}
                              sn={++i}
                              orderDetails={orderDetails}
                              onEditOrder={this.onEditOrder}
                              showDetails={this.showDetails}
                              {...this.props}
                            />
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
            }
          {
            (orders.length !== 0)
            &&
            <div className="order">
              {
                (grandTotalPrice >= 0)
                &&
                (
                  <p className="grandTot">
                    Grand Total (&#8358;): {grandTotalPrice}
                  </p>
                )
              }
            </div>
          }
        </div>
        <Modal
          hideModal={this.hideModal}
          deleteRow={this.deleteRow}
          updatePortion={this.updatePortion}
          {...this.props}
        />
      </section>
    );
  }
}

CustomerOrder.propTypes = {
  orders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  deleteMealInEditOrder: PropTypes.func.isRequired,
  updateOrderedMealPortion: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  setEditOrder: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  orders: filterify(state.orders.history, state.filter),
  modal: state.modal,
  editOrder: state.orders.editOrder,
  userId: state.login.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModal,
    updateOrder,
    deleteMealInEditOrder,
    updateOrderedMealPortion,
    setEditOrder,
    deleteOrder,
    getOrders,
    setFilter,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerOrder));
