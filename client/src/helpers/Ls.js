/**
 * Stores data in LocalStorage
 *
 * @param  {string} datakey - the key for the data to be stored
 * @param  {any} data - the data to be stored
 */
export const storeInLs = (dataKey, data) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
};

/**
 * Gets data from LocalStorage
 *
 * @param  {string} datakey - the key for the data to be retrieved
 */
export const getFromLs = dataKey => JSON.parse(localStorage.getItem(dataKey));

/**
 * Deletes data in LocalStorage
 *
 * @param  {string} datakey - the key for the data to be deleted
 */
export const delFromLs = (dataKey) => {
  localStorage.removeItem(dataKey);
};
