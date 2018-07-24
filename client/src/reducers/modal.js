const modalDefaultState = {
  isOpen: false,
  isEdit: false,
  isInfo: false,
  isSetMenu: false,
  close: true,
  content: {},
  contentLabel: ''
};

const modalReducer = (state = modalDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...action.modal
      };
    default:
      return state;
  }
};

export default modalReducer;
