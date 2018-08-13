import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import OrderDetailsTable from './modalTables/OrderDetails';
import EditOrderTable from './modalTables/EditOrder';

Modal.setAppElement('#root');
const ModalComp = (props) => {
  const {
    isOpen,
    isInfo,
    isEdit,
    content,
    contentLabel,
  } = props.modal;

  return (
    <Modal
      isOpen={isOpen}
      contentLabel={contentLabel}
      overlayClassName="overlay"
      className="modal"
    >
      <div className="closeBtn">
        <button
          type="button"
          onClick={props.hideModal}
          className="modal-btn"
        >
          <FontAwesome
            name="times"
            size="2x"
          />
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
