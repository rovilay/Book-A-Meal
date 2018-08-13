/**
 *
 * @param {Array} arr array of objects or number to summ
 * @param {any} objProperty (optional) objectproperty to use if arr is an array of objects
 */
const summer = (arr, objProperty) => {
  let x;
  (objProperty) ? x = arr.map(obj => obj[objProperty]) : x = arr;
  const reducer = (accumlator, currVal) => accumlator + currVal;
  return x.reduce(reducer, 0);
};

export default summer;
