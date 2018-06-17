import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import MenuDetailsTable from '../MenuTable/MenuDetails';

Modal.setAppElement('#root');
class ModalComp extends Component {
  render() {
    const { hideModal, modal } = this.props;
    const {
      isOpen,
      isInfo,
      // isEdit,
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
              {...this.props}
            />
          )
        }

        {/* {
          (isEdit)
          &&
          (
            <EditOrderTable
              title={contentLabel}
              isEdit={isEdit}
              {...props}
            />
          )
        } */}
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ModalComp;
