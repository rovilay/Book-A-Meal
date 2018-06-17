import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import MenuDetailsTable from '../MenuTable/MenuDetails';
import EditMenuTable from '../MenuTable/EditMenu';

Modal.setAppElement('#root');
const ModalComp = (props) => {
  const { hideModal, modal } = props;
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
          onClick={hideModal}
          className="btn-col btn-1"
        >
          close
        </button>
      </div>

      {
        (isInfo && content)
        &&
        (
          <MenuDetailsTable
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
          <EditMenuTable
            title={contentLabel}
            content={content}
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
