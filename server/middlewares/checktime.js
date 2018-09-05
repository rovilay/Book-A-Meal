import moment from 'moment';
import dotenv from 'dotenv';
import db from '../../models/index';

dotenv.config();

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
        id: req.params.orderId,
      },
      attributes: ['id', 'createdAt'],
    })
      .then((found) => {
        const err = new Error("You can't modify order anymore");
        err.status = 403;
        const [createdAt] = [found.dataValues.createdAt]; // Get the time created
        const timeCheck = moment(createdAt).add(15, 'm') > moment(); // compare expiry time with present time
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
    // Can only place order between OPENINGHOUR AND CLOSINGHOUR
    if (moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
      return next();
    }

    return next(err);
  }
}

export default checkTime;
