/* eslint class-methods-use-this:0 */
/* eslint max-len:0 */
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import Modal from '../Modal/Index';
import navData from '../../../helpers/navData';
import { orderHead } from '../../../helpers/tableHeadData';
import filterify from '../../../helpers/filterify';
import AdminOrderTableRow from './OrderTablerow';
import setFilter from '../../../actions/filterActions';
import { getAllOrders, getOrderMeals } from '../../../actions/ordersActions';
import setModal from '../../../actions/modalActions';
import { emptyEditMenu } from '../../../actions/menuActions';
import Filter from '../../common/Filter';

export class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getAllOrders({});
    this.props.setFilter({ filter: 'all' });
    this.hideModal();
  }

  hideModal() {
    this.props.setModal({
      isOpen: false,
      isEdit: false,
      isInfo: false,
      isOrderInfo: false,
      close: true,
      contentLabel: '',
    });
  }

  showDetails(mealsUrl) {
    this.props.getOrderMeals(mealsUrl, {})
      .then((response) => {
        this.props.setModal({
          isOpen: true,
          isInfo: false,
          isEdit: false,
          isOrderInfo: true,
          close: false,
          contentLabel: 'Order details',
          content: { ...response.order[0] },
          pagination: { ...response.pagination }
        });
      });
  }

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const nextPage = data.selected;
    const { limit } = this.props.pagination;
    const nextOffset = nextPage * limit;

    this.props.getAllOrders({ limit, offset: nextOffset });
  }

  render() {
    const { orders, pagination, grandTotalPrice } = this.props;
    const { offset, numOfPages, count } = pagination;

    return (
      <div className="admin-orderPage">
        <div className="welcome">
          <p className="merienda">
            Order History
          </p>
        </div>

        <div className="table-container">
          <Filter
            {...this.props}
            tableContent="order_history"
          />

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
                      <AdminOrderTableRow
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
                  Total Sales: &#8358;{grandTotalPrice}
                </p>
              )
            }
          </div>
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

        <Modal
          hideModal={this.hideModal}
          deleteRow={this.deleteRow}
          {...this.props}
        />
      </div>
    );
  }
}

OrderHistory.propTypes = {
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  setNav: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  grandTotalPrice: PropTypes.number.isRequired,
  getOrderMeals: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  orders: filterify(state.orders.history, state.filter),
  modal: state.modal,
  pagination: state.orders.pagination,
  grandTotalPrice: state.orders.grandTotalPrice,
  orderedMealsPagination: state.orders.orderedMealsPagination
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModal,
    emptyEditMenu,
    getAllOrders,
    setFilter,
    getOrderMeals
  },
  dispatch
);

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(OrderHistory));
