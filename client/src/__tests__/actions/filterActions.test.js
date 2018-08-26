import mockStore from '../__mockData__/mockStore';
import { SET_FILTER } from '../../actions/actiontypes';
import setFilter from '../../actions/filterActions';
import { filterDefaultState } from '../../reducers/filterReducer';


describe('Filter Actions test', () => {
  it('should set filter', (done) => {
    const store = mockStore(filterDefaultState);

    const expectedAction = {
      type: SET_FILTER,
      filter: {
        by: 'month',
        date: '',
        month: 'August'
      }
    };

    store.dispatch(setFilter({ filter: 'month', month: 'August' }))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });
});
