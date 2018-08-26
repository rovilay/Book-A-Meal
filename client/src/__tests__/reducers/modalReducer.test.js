import { modalDefaultState, modalReducer } from '../../reducers/modalReducer';
import setModal from '../../actions/modalActions';


describe('Modal reducers', () => {
  const openModalForMealEdit = {
    isOpen: true,
    isEdit: true,
    close: false,
    content: {
      id: 1,
      title: 'EBA AND EGUSI'
    },
    contentLabel: 'Edit Meal',
    pagination: {
      limit: 10,
      offset: 0,
      numOfPages: 1
    }
  }

  it('should update modal state if modal data is set', (done) => {
    const action = setModal(openModalForMealEdit);
    const newState = modalReducer(modalDefaultState, action);
    expect(newState).toEqual({
      ...openModalForMealEdit,
      isOrderInfo: false,
      isInfo: false,
      isSetMenu: false,
    });

    done();
  });


  it('should return default state for unknown action type', (done) => {
    const action = {
      type: undefined,
    }
    const newState = modalReducer(modalDefaultState, action);
    expect(newState).toEqual(modalDefaultState);

    done();
  });
});
