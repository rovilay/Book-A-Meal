import { navLinksDefaultState, navLinksReducer } from '../../reducers/navLinksReducer';
import { setNav, setDefaultNav } from '../../actions/navLinksActions';
import navData from '../../helpers/navData';

describe('Navigation Links reducers', () => {
  it('should update navigation links state if navigation data is set', (done) => {
    const action = setNav(navData.customerNav);
    const newState = navLinksReducer(navLinksDefaultState, action);
    expect(newState).toEqual(navData.customerNav);

    done();
  });

  it('should set default state is default navigation action is passed', (done) => {
    const action = setDefaultNav();
    const newState = navLinksReducer(navLinksDefaultState, action);
    expect(newState).toEqual(navLinksDefaultState);

    done();
  });


  it('should return default state for unknown action type', (done) => {
    const action = {
      type: undefined,
    }
    const newState = navLinksReducer(navLinksDefaultState, action);
    expect(newState).toEqual(navLinksDefaultState);

    done();
  });
});
