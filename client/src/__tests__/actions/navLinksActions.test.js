import mockStore from '../__mockData__/mockStore';
import { navLinksDefaultState } from '../../reducers/navLinksReducer';
import navData from '../../helpers/navData';
import { setNav, setDefaultNav } from '../../actions/navLinksActions';
import { SET_NAV_BAR, SET_DEFAULT_NAV } from '../../actions/actiontypes';

describe('NavLinks Actions test', () => {
  it('should set default navigation bar', (done) => {
    const store = mockStore(navLinksDefaultState);

    const expectedAction = {
      type: SET_DEFAULT_NAV,
    };

    store.dispatch(setDefaultNav())
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should set navigation bar', (done) => {
    const store = mockStore(navLinksDefaultState);

    const expectedAction = {
      type: SET_NAV_BAR,
      navData: navData.adminNav
    };

    store.dispatch(setNav(navData.adminNav))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });
})

