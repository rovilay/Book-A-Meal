/* eslint class-methods-use-this:0 */
/* eslint max-len:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import Modal from '../Modal/Index';
import navData from '../../../helpers/navData';
import tableHeadData from '../../../helpers/tableHeadData';
import filterify from '../../../helpers/filterify';
import TableHead from '../../common/Table/TableHead';
import OrderTableRow from '../../common/Table/OrderTableRow';
import setFilter from '../../../actions/filterActions';
import { getAllOrders } from '../../../actions/ordersActions';
import { setModal } from '../../../actions/modalActions';
import { emptyEditMenu } from '../../../actions/menuActions';
import summer from '../../../helpers/summer';
import Filter from '../../common/Filter';

class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getAllOrders();
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

  showDetails(orderDetails) {
    this.props.setModal({
      isOpen: true,
      isInfo: false,
      isEdit: false,
      isOrderInfo: true,
      close: false,
      contentLabel: 'Order details',
      content: { ...orderDetails }
    });
  }

  render() {
    const { orders } = this.props;
    const grandTotalPrice = summer(orders, 'totalPrice');

    return (
      <div className="pull-down">
        <div className="title" id="menu-title">
          Order History
        </div>
        <hr />
        <div className="table-container">
          <Filter
            {...this.props}
            tableContent="order_history"
          />
          {
            (orders.length === 0)
              ?
                <p className="empty not-found">No orders found!</p>
              :
              (
                <div>
                  <table>
                    <TableHead tableHeadData={tableHeadData.orderHead} />
                    <tbody>
                      {
                        orders.map((order, i) => {
                          const {
                            id: orderId,
                            createdAt: date,
                            totalPrice,
                            deliveryAddress: address,
                            Meals: meals,
                            User
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
                            date: moment(date).format('LL'),
                            user: `${User.firstName} ${User.lastName}`
                          };

                          return (
                            <OrderTableRow
                              key={i}
                              item={item}
                              orderCreatedAt={order.createdAt}
                              sn={++i}
                              orderDetails={orderDetails}
                              showDetails={this.showDetails}
                              {...this.props}
                            />
                          );
                        })
                      }
                    </tbody>
                  </table>

                  {
                    (grandTotalPrice > 0)
                    &&
                    (
                      <p>
                        Grand Total (&#8358;): {grandTotalPrice}
                      </p>
                    )
                  }
                </div>
              )
          }
        </div>
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
  setNav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: filterify(state.orders.history, state.filter),
  modal: state.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModal,
    emptyEditMenu,
    getAllOrders,
    setFilter
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderHistory));
