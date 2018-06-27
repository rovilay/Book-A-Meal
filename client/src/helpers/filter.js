import moment from 'moment';

/**
 * Filters Arrays based on filter parameters
 * @param {object} filter filter parameters
 * @param {Array} objectToFilter Array of objects to filter
 * @returns {Array} returns a filtered array
 */
const filterify = (filter, objectToFilter) => {
  let filteredArr = [];
  if (filter.by === 'date' && filter.date) {
    objectToFilter.map((val) => {
      if (val.postOn || val.createdAt) {
        const filterDate = moment(filter.date).format('LL');
        const valDate = moment(val.postOn).format('LL') || moment(val.createdAt).format('LL');
        if (filterDate === valDate) {
          filteredArr.push(val);
        }
      }
    });
  }

  if (filter.by === 'month' && filter.month) {
    objectToFilter.map((val) => {
      if (val.createdAt) {
        const valDate = moment(val.createdAt).format('LL');
        if (valDate.includes(filter.month)) {
          filteredArr.push(val);
        }
      }
    });
  }

  if (filter.by === 'all') {
    filteredArr = [...objectToFilter];
  }

  console.log(filteredArr);
  return filteredArr;
};

export default filterify;
