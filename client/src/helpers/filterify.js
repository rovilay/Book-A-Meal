import moment from 'moment';

/**
 *
 * @param {Array} objectToFilter array of objects to filter
 * @param {object} filterParams filter parameters includes {by, date, month}
 */
const filterify = (objectToFilter, { by: filterBy, date, month }) => {
  if (filterBy === 'all') {
    return objectToFilter;
  }

  if (filterBy === 'date') {
    return objectToFilter.filter((val) => {
      const valDate = (val.postOn) ? moment(val.postOn).format('LL') : moment(val.createdAt).format('LL');
      const dateMatch = valDate === moment(date).format('LL');
      return dateMatch;
    });
  }

  if (filterBy === 'month') {
    return objectToFilter.filter((val) => {
      const monthMatch = val.createdAt && moment(val.createdAt).format('LL').includes(month);
      return monthMatch;
    });
  }
};

export default filterify;
