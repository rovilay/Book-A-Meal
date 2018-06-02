/**
 * Compares time against now
 *
 * @param  {number} expireTimeInSec - the time you want to compare against now (should be in secs)
 * @return {boolean} reponse true if now is greater than the provided time
 */
const isExpired = (expireTimeInSec) => {
  if (expireTimeInSec) {
    const now = new Date();
    const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
    return nowInSec > expireTimeInSec;
  }
};

export default isExpired;
