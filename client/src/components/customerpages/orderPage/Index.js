/* eslint class-methods-use-this:0 */
/* eslint max-len:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import ReactPaginate from 'react-paginate';

import Modal from '../modal/Index';
import { orderHead } from '../../../helpers/tableHeadData';
import CustomerOrderTableRow from './CustomerOrderTablerow';
import isExpired from '../../../helpers/isExpired';
import navData from '../../../helpers/navData';
import { getFromLocalStorage } from '../../../helpers/localstorage';
import filterify from '../../../helpers/filterify';
import {
  deleteMealInEditOrder,
  updateOrder,
  updateOrderedMealPortion,
  setEditOrder,
  deleteOrder,
  getOrders,
  getOrderMeals
} from '../../../actions/ordersActions';
import setFilter from '../../../actions/filterActions';
import setModal from '../../../actions/modalActions';
import Filter from '../../common/Filter';

export class CustomerOrderPage extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.onEditOrder = this.onEditOrder.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
    this.getCustomerOrders = this.getCustomerOrders.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
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
  onEditOrder(mealsUrl) {
    this.props.getOrderMeals(mealsUrl, {})
      .then((response) => {
        const {
          Meals,
          id: orderId,
          UserId,
          deliveryAddress,
        } = response.order[0];
        const orderedMeals = [];
        let totalPrice = 0;

        Meals.map((meal) => {
          const {
            id,
            title,
            OrderMeal
          } = meal;
          const { portion, cost } = OrderMeal;
          const price = cost * portion;
          totalPrice += price;

          orderedMeals.push({
            id,
            title,
            cost,
            portion,
            price
          });
        });

        this.props.setEditOrder({
          orderId,
          UserId,
          deliveryAddress,
          orderedMeals,
          totalPrice
        });

        this.props.setModal({
          isOpen: true,
          isEdit: true,
          isInfo: false,
          close: false,
          contentLabel: 'Edit Order',
          content: { ...response.order[0] },
          pagination: { ...response.pagination }
        });
      });
  }

  /**
   * Gets customer's orders,
   * Calls the getOrders action
   */
  getCustomerOrders(nextPage = 1) {
    const token = getFromLocalStorage('jwt');
    const { history, pagination } = this.props;
    const { limit } = pagination;
    if (token) {
      const {
        id,
        admin,
        exp
      } = jwt.decode(token);

      const offset = (nextPage - 1) * limit;

      if (!isExpired(exp) && !admin) {
        this.props.getOrders(id, { limit, offset });
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
  showDetails(mealsUrl) {
    this.props.getOrderMeals(mealsUrl, {})
      .then((response) => {
        this.props.setModal({
          isOpen: true,
          isInfo: true,
          isEdit: false,
          isOrderInfo: false,
          close: false,
          contentLabel: 'Order details',
          content: { ...response.order[0] },
          pagination: { ...response.pagination }
        });
      });
  }

  /**
   *
   * @param {string} id deletes meal while editing an order
   */
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

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const nextPage = data.selected + 1;
    this.getCustomerOrders(nextPage);
  }

  render() {
    const { orders, pagination, grandTotalPrice } = this.props;
    const { offset, numOfPages, count } = pagination;

    return (
      <section className="cartpage orderpage">
        <div className="title merienda" id="">
          Your Order History
        </div>
        <hr />
        <div className="table-container">
          {
            (orders.length > 0)
            &&
            <Filter
              {...this.props}
              tableContent="customer_orders"
            />
          }
          {
            (count > 10)
            &&
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel={<a href="">...</a>}
              breakClassName="break-me"
              pageCount={numOfPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePaginationClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          }
        </div>
        {
          (orders.length === 0)
            ?
              <p className="empty not-found">No orders found!</p>
            :
            (
              <div className="container-test">
                <div className="row head">
                  {
                    orderHead.map((title, i) => (
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
                  orders.map((order, i) => {
                    const {
                      id: orderId,
                      createdAt,
                      totalPrice,
                      Meals: mealsUrl
                    } = order;

                    const item = {
                      sn: (++i + offset),
                      orderId,
                      date: moment(createdAt).format('LL'),
                      totalPrice,
                    };
                    return (
                      <CustomerOrderTableRow
                        {...this.props}
                        key={i}
                        sn={++i}
                        item={item}
                        showDetails={this.showDetails}
                        mealsUrl={mealsUrl}
                        editOrder={this.onEditOrder}
                        updatePortion={this.updatePortion}
                        orderCreatedAt={createdAt}
                        actions={{
                          delete: true,
                          info: true,
                          edit: true
                        }}
                      />
                    );
                  })
                }
              </div>
            )
          }
        {
          (orders.length !== 0)
          &&
          <div className="order">
            {
              (grandTotalPrice > 0)
              &&
              (
                <p className="grandTot">
                  Grand Total (&#8358;): {grandTotalPrice}
                </p>
              )
            }
          </div>
        }

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

CustomerOrderPage.propTypes = {
  orders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  deleteMealInEditOrder: PropTypes.func.isRequired,
  updateOrderedMealPortion: PropTypes.func.isRequired,
  grandTotalPrice: PropTypes.number.isRequired,
  setNav: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  getOrderMeals: PropTypes.func.isRequired,
  setEditOrder: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  orderedMealsPagination: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  orders: filterify(state.orders.history, state.filter),
  grandTotalPrice: state.orders.grandTotalPrice,
  pagination: state.orders.pagination,
  orderedMealsPagination: state.orders.orderedMealsPagination,
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
    getOrderMeals,
    setFilter,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerOrderPage));
