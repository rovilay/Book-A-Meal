import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import setModal from '../../actions/modal';
import OrderDetailsTable from '../customerpages/modalTables/orderDetails';
import EditOrderTable from '../customerpages/modalTables/editOrder';

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
      isEdit: false,
      isInfo: false,
      close: true,
      contentLabel: '',
    }));
  }
  render() {
    const { modal, editOrder } = this.props;
    const {
      isOpen,
      isInfo,
      isEdit,
      content,
      contentLabel
    } = modal;
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
            />
          )
        }

        {
          (isEdit)
          &&
          (
            <EditOrderTable
              title={contentLabel}
              // content={content}
              isEdit={isEdit}
              editOrder={editOrder}
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
  editOrder: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal,
  editOrder: state.orders.editOrder
});

export default connect(mapStateToProps)(ModalComp);
