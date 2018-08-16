/**
 *
 * @param {number} limit - the number of items to return
 * @param {number} offset - the number of items to skip before returning
 * @param {number} count - the total number of items
 */
const paginate = (limit, offset, count) => {
  // convert all params to number
  limit = Math.ceil(limit);
  offset = Math.ceil(offset);
  count = Math.ceil(count);
  let numOfPages = 0;
  let curPage = 0;
  let nextOffset = 0;

  if (typeof offset === 'number' && limit && count) {
    numOfPages = Math.ceil(count / limit);
    curPage = Math.ceil(offset / limit) + 1;
    nextOffset = limit + offset;

    if (curPage > numOfPages) {
      curPage = 0;
      nextOffset = 0;
    }

    if (offset >= count) {
      nextOffset = 0;
    }
  }

  return {
    limit,
    offset,
    count,
    numOfPages,
    curPage,
    nextOffset
  };
};

export default paginate;
