import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import setModal from '../../actions/modal';
import OrderDetailsTable from '../customerpages/modalTables/orderDetails';
import EditOrderTable from '../customerpages/modalTables/editOrder';
import { deleteMealInEditOrder, updateMealPortion, updateOrder } from '../../actions/orders';

Modal.setAppElement('#root');
class ModalComp extends Component {
  constructor(props) {
    super(props);

    this.hideDetails = this.hideDetails.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updatePortion = this.updatePortion.bind(this);
    // this.updateOrder = this.updateOrder.bind(this);
  }

  hideDetails() {
    this.props.setModal({
      isOpen: false,
      isEdit: false,
      isInfo: false,
      close: true,
      contentLabel: '',
    });
  }

  deleteRow(id) {
    this.props.deleteMealInEditOrder(id);
    console.log('row deleted');
  }


  updatePortion(mealId, portion) {
    this.props.updateMealPortion({ mealId, portion });
  }


  render() {
    const {
      isOpen,
      isInfo,
      isEdit,
      content,
      contentLabel
    } = this.props.modal;
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
          (isInfo && content)
          &&
          (
            <OrderDetailsTable
              title={contentLabel}
              content={content}
              deleteRow={this.deleteRow}
              updatePortion={this.updatePortion}
              {...this.props}
            />
          )
        }

        {
          (isEdit)
          &&
          (
            <EditOrderTable
              title={contentLabel}
              isEdit={isEdit}
              deleteRow={this.deleteRow}
              updatePortion={this.updatePortion}
              {...this.props}
            />
          )
        }
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  deleteMealInEditOrder: PropTypes.func.isRequired,
  updateMealPortion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal,
  editOrder: state.orders.editOrder,
  userId: state.login.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setModal,
    updateOrder,
    deleteMealInEditOrder,
    updateMealPortion
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalComp);
