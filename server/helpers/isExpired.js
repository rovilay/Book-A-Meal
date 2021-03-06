import moment from 'moment';

/**
 * Compares now against given date
 *
 * @param  {string} dateToCompare- the date you want to compare against now format -('yyyy-mm-dd')
 * @return {boolean} reponse true if now is greater than the provided date
 */
const isExpired = (dateToCompare) => {
  if (dateToCompare) {
    const now = moment().format('YYYY-MM-DD');
    return moment(now).isAfter(moment(dateToCompare, 'YYYY-MM-DD'));
  }
};

export default isExpired;
