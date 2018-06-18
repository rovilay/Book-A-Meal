const setModal = ({
  isOpen,
  isEdit,
  isInfo,
  isSetMenu = false,
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
      isSetMenu,
      close,
      contentLabel,
      content
    }
  }
);

export default setModal;
