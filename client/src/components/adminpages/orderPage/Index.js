/* eslint class-methods-use-this:0 */
/* eslint max-len:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../Modal/Index';
import navData from '../../../helpers/navData';
import tableHead from '../../../helpers/tableHead';
import TableHead from '../../common/Table/TableHead';
import OrderTableRow from '../../common/Table/OrderTableRow';
import filterAction from '../../../actions/filter';
import adminActions from '../../../actions/admin';
import FilterComp from '../../common/Filter';

class OrderHistory extends Component {
  constructor(props) {
    super(props);

    this.hideModal = this.hideModal.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getAllOrders();
    this.props.filterAction('order_history', { filter: 'all' });
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

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  render() {
    const { orders, filteredOrders } = this.props;
    const sortedOrders = filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
      <div className="pull-down">
        <div className="title" id="menu-title">
          Order History
        </div>
        <hr />
        <div className="table-container">
          <FilterComp
            {...this.props}
            tableContent="order_history"
          />
          {
            (filteredOrders.length === 0)
            ?
              <p className="empty not-found">No orders found!</p>
            :
              (
                <div>
                  <table>
                    <TableHead tableHead={tableHead.orderHead} />
                    <tbody>
                      {
                        sortedOrders.map((order, i) => {
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
                              sn={++i}
                              orderDetails={orderDetails}
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
                    (orders.grandTotalPrice > 0)
                    &&
                    (
                      <p>
                        Grand Total (&#8358;): {orders.grandTotalPrice}
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
          notify={this.notify}
          {...this.props}
        />
        <ToastContainer />
      </div>

    );
  }
}

OrderHistory.propTypes = {
  orders: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  filterAction: PropTypes.func.isRequired,
  filteredOrders: PropTypes.array.isRequired,
  setNav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.admin.orders,
  filteredOrders: state.admin.filteredOrders,
  modal: state.admin.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...adminActions,
    filterAction
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderHistory));
