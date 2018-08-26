import {
  SET_MODAL
} from './actiontypes';

/**
 * sets modal state
 *
 * @param {Boolean} isOpen open modal
 * @param {Boolean} isEdit modal is in edit state
 * @param {Boolean} isInfo modal is in info state
 * @param {Boolean} isSetMenu modal is in set menu state
 * @param {Boolean} close close modal
 * @param {Object} content modal content;
 * @param {String} contentLabel modal label
 * @param {object} pagination modal pagination
 * @returns {Object} action types and modal properties
 */
const setModal = ({
  isOpen = false,
  isEdit = false,
  isInfo = false,
  isSetMenu = false,
  isOrderInfo = false,
  close = true,
  content = {},
  contentLabel = '',
  pagination
}) => (
  {
    type: SET_MODAL,
    modal: {
      isOpen,
      isEdit,
      isInfo,
      isOrderInfo,
      isSetMenu,
      close,
      contentLabel,
      content,
      pagination
    }
  }
);

export default setModal;
