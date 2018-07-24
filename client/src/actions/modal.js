const setModal = ({
  isOpen = false,
  isEdit = false,
  isInfo = false,
  isSetMenu = false,
  close = true,
  content = {},
  contentLabel = ''
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
