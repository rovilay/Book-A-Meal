import moment from 'moment';
import db from '../../models/index';
/**
 * Restricts user based on time
 *
 * @exports checkTime
 * @class checkTime
 */
class checkTime {
  /**
   * Checks time if update is allowed
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof checkTime
   */
  static canUpdate(req, res, next) {
    db.Order.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'createdAt'],
    })
      .then((found) => {
        const err = new Error("You can't modify order anymore");
        err.status = 403;
        const [createdAt] = [found.dataValues.createdAt]; // Get the time created
        const timeCheck = moment(createdAt).add(1, 'hour') > moment(); // compare expiry time with present time
        if (timeCheck) {
          return next();
        }
        throw err;
      })
      .catch(err => next(err));
  }

  /**
   * Checks time if order is allowed
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof checkTime
   */
  static canOrder(req, res, next) {
    const err = new Error(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
    err.status = 403;
    // Can only place order between 7 a.m. to 6 p.m.
    if (moment().hour() >= 7 && moment().hour() <= 18) {
      return next();
    }

    return next(err);
  }
}

export default checkTime;
