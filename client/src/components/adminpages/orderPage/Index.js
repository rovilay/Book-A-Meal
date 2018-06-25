/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../../../assets/css/table.css';
import Modal from '../Modal/Index';
import navData from '../../../helpers/navData';
import tableHead from '../../../helpers/tableHead';
import TableHead from '../../common/Table/TableHead';
import OrderTableRow from '../../common/Table/OrderTableRow';
import adminActions from '../../../actions/admin';

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
    const { history, grandTotalPrice } = this.props.orders;
    const sortedOrders = history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
      <div className="pull-down">
        <div className="title" id="menu-title">
          Order History
        </div>
        <hr />
        <div className="table-container">
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
            notify={this.notify}
            {...this.props}
          />
          <ToastContainer />
        </div>
      </div>

    );
  }
}

OrderHistory.propTypes = {
  orders: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.admin.orders,
  modal: state.admin.modal,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...adminActions
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderHistory));
