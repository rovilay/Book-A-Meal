/**
 * Compares time against now
 *
 * @param  {number} expiredTimeInSec - the time you want to compare against now (should be in secs)
 * @return {boolean} reponse true if now is greater than the provided time
 */
const isExpired = (expiredTimeInSec) => {
  if (expiredTimeInSec) {
    const now = new Date();
    const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
    return nowInSec > expiredTimeInSec;
  }
};

export default isExpired;
