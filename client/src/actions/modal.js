const setModal = ({
  isOpen,
  // afterOpen = '',
  close,
  contentLabel,
  content = {}
}) => (
  {
    type: 'SET_MODAL',
    modal: {
      isOpen,
      // afterOpen,
      close,
      contentLabel,
      content
    }
  }
);

export default setModal;
