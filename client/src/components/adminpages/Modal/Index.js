import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FontAwesome from 'react-fontawesome';

import EditMenuTable from '../dashboard/MenuTable/EditMenu';
import OrderDetailsTable from '../orderPage/OrderDetails';

Modal.setAppElement('#root');
class ModalComp extends Component {
  componentDidMount() {
    this.props.emptyEditMenu();
  }

  render() {
    const { hideModal, modal } = this.props;
    const {
      isOpen,
      isEdit,
      isOrderInfo,
      content,
      contentLabel,
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
            className=""
          >
            <FontAwesome
              name="times"
              size="2x"
            />
          </button>
        </div>
        {
          (isEdit)
          &&
          (
            <EditMenuTable
              title={contentLabel}
              content={content}
              isEdit={isEdit}
              {...this.props}
            />
          )
        }

        {
          (isOrderInfo)
          &&
          (
            <OrderDetailsTable
              title={contentLabel}
              content={content}
              isEdit={isEdit}
              {...this.props}
            />
          )
        }
      </Modal>
    );
  }
}

ModalComp.defaultProps = {
  emptyEditMenu: undefined
};

ModalComp.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  emptyEditMenu: PropTypes.func,
};

export default ModalComp;
