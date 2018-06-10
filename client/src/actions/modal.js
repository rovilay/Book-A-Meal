const setModal = ({
  isOpen,
  isEdit,
  isInfo,
  close,
  contentLabel,
  content = {}
}) => (
  {
    type: 'SET_MODAL',
    modal: {
      isOpen,
      isEdit,
      isInfo,
      close,
      contentLabel,
      content
    }
  }
);

export default setModal;
