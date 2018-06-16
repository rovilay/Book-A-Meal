const modalDefaultState = {
  isOpen: false,
  isEdit: false,
  isInfo: false,
  close: true,
  content: {},
  contentLable: ''
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
