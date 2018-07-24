import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import OrderDetailsTable from '../customerpages/modalTables/orderDetails';
import EditOrderTable from '../customerpages/modalTables/editOrder';

Modal.setAppElement('#root');
const ModalComp = (props) => {
  const {
    isOpen,
    isInfo,
    isEdit,
    content,
    contentLabel
  } = props.modal;

  return (
    <Modal
      isOpen={isOpen}
      contentLabel= {contentLabel}
      overlayClassName="overlay"
      className="modal"
    >
      <div className="closeBtn">
        <button
          type="button"
          onClick={props.hideModal}
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
            {...props}
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
            {...props}
          />
        )
      }
    </Modal>
  );
};

ModalComp.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ModalComp;
