import { filterDefaultState, filterReducer } from '../../reducers/filterReducer';
import setFilter from '../../actions/filterActions';

describe('filter reducers', () => {
  it('should update filter state if filter data is set', (done) => {
    const action = setFilter({ filter: 'date', date: '2018-08-25' });
    const newState = filterReducer(filterDefaultState, action);
    expect(newState).toEqual({
      by: 'date',
      date: '2018-08-25',
      month: ''
    });

    done();
  });


  it('should set default filter state for unknown action types', (done) => {
    const action = {
      type: undefined
    };

    const newState = filterReducer(filterDefaultState, action);
    expect(newState).toEqual(filterDefaultState);

    done();
  });
});
