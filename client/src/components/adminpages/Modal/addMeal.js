import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import AddMealComp from '../dashboard/MenuTable/AddMeal';

Modal.setAppElement('#root');
class ModalComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    this.setState({ isOpen: this.props.isEdit });
  }

  render() {
    const { isEdit } = this.props;
    // const {
    //   isOpen,
    //   isInfo,
    //   isEdit,
    //   isOrderInfo,
    //   content,
    //   contentLabel,
    // } = modal;

    const { isOpen } = this.state;

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
  // modal: PropTypes.object.isRequired,
  // setModal: PropTypes.func.isRequired,
  // hideModal: PropTypes.func.isRequired,
  // emptyEditMenu: PropTypes.func,
  isEdit: PropTypes.bool.isRequired
};

export default ModalComp;
