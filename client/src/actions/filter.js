/**
 * Filter action creator
 * @param {string} type the type table content you want to filter
 * @param {string} filter the filter by ?
 * @param {date} date date value if filter by = date
 * @param {string} filter month value if filter by = month
 * @returns {Object} returns an object of type and filter parameters
 */
const filter = (type, { filter: by, date, month }) => (
  {
    type: `FILTER_${type.toUpperCase()}`,
    filter: {
      by,
      date,
      month
    }
  }
);

export default filter;
