import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import setModal from '../../actions/modal';
import tableHead from '../../helpers/tableHead';
import TableHead from '../common/Table/TableHead';
import TableRow from '../common/Table/OrderTableRow';

Modal.setAppElement('#root');
class ModalComp extends Component {
  constructor(props) {
    super(props);

    this.hideDetails = this.hideDetails.bind(this);
  }
  hideDetails() {
    const { dispatch } = this.props;
    dispatch(setModal({
      isOpen: false,
      close: true,
      contentLabel: 'Order details',
    }));
  }
  render() {
    const {
      isOpen,
      content,
      contentLabel
    } = this.props.modal;
    const {
      meals: orderMeals,
      address,
      totalPrice,
      date,
      time
    } = content;

    return (
      <Modal
        isOpen={isOpen}
        contentLabel= {contentLabel}
        overlayClassName="overlay"
        className="modal"
      >
        <div className="closeBtn">
          <button
            onClick={this.hideDetails}
            className="btn-col btn-1"
          >
            close
          </button>
        </div>
        {
          (orderMeals)
          &&
          (
            <div className="table-container">
              <h2 className="title">
                Order details
              </h2>
              <hr />
              <p>
                <span className="bold">Date:</span> {date}
              </p>
              <p>
                <span className="bold">Time:</span> {time}
              </p>
              <p>
                <span className="bold">Address:</span> {address}
              </p>
              <p>
                <span className="bold">Total Price (&#8358;):</span> {totalPrice}
              </p>
              <table>
                <TableHead tableHead={tableHead.orderDetailHead} />
                <tbody>
                  {
                    orderMeals.map((meal, i) => {
                      const {
                        title: Meal,
                        price: unitPrice,
                        OrderMeal
                      } = meal;
                      const { portion } = OrderMeal;
                      const price = unitPrice * portion;
                      const item = {
                        sn: ++i,
                        Meal,
                        unitPrice,
                        portion,
                        price
                      };

                      return (
                        <TableRow
                          key={i}
                          item={item}
                          sn={++i}
                          orderDetails={{}}
                        />
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  modal: PropTypes.object.isRequired,
  // isOpen: PropTypes.bool.isRequired,
  // afterOpen: PropTypes.any.isRequired,
  // closeModal: PropTypes.bool.isRequired,
  // close: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
  // contentLabel: PropTypes.string.isRequired,
  // content: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps)(ModalComp);
