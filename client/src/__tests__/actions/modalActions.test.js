import mockStore from '../__mockData__/mockStore';
import { navLinksDefaultState } from '../../reducers/navLinksReducer';
import navData from '../../helpers/navData';
import setModal from '../../actions/modalActions';
import { SET_MODAL } from '../../actions/actiontypes';
import { modalDefaultState } from '../../reducers/modalReducer';


describe('Modal Actions test', () => {
  it('should set modal', (done) => {
    const store = mockStore(modalDefaultState);

    const openModal = {
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
    const expectedAction = {
      type: SET_MODAL,
      modal: {
        ...openModal,
        isOrderInfo: false,
        isInfo: false,
        isSetMenu: false,
      }
    };

    store.dispatch(setModal(openModal))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });
})
