import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import MenuDetailsTable from '../dashboard/MenuTable/MenuDetails';
import EditMenuTable from '../dashboard/MenuTable/EditMenu';
import OrderDetailsTable from '../orderPage/orderDetails';

Modal.setAppElement('#root');
class ModalComp extends Component {
  componentDidMount() {
    this.props.emptyEditMenu();
  }
  render() {
    const { hideModal, modal } = this.props;
    const {
      isOpen,
      isInfo,
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
