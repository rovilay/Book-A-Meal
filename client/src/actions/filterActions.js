import { SET_FILTER } from './actiontypes';

/**
 *
 * @param {object} filter filter parameters includes { filter, date, month }
 */
const setFilter = ({ filter: by, date = '', month = '' }) => (
  {
    type: SET_FILTER,
    filter: {
      by,
      date,
      month
    }
  }
);

export default setFilter;
