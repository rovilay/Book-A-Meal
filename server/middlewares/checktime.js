import moment from 'moment';
import dotenv from 'dotenv';
import db from '../../models/index';

dotenv.config();

/**
 * Restricts user based on time
 *
 * @exports CheckTime
 * @class CheckTime
 */
class CheckTime {
  /**
   * Checks time if update is allowed
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof CheckTime
   */
  static canUpdate(req, res, next) {
    db.Order.findOne({
      where: {
        id: req.params.orderId,
      },
      attributes: ['id', 'createdAt'],
    })
      .then((found) => {
        const error = new Error("You can't modify order anymore");
        error.status = 403;
        const [createdAt] = [found.dataValues.createdAt]; // Get the time created
        const timeCheck = moment(createdAt).add(15, 'm') > moment(); // compare expiry time with present time
        if (timeCheck) {
          return next();
        }
        throw error;
      })
      .catch(error => next(error));
  }

  /**
   * Checks time if order is allowed
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof CheckTime
   */
  static canOrder(req, res, next) {
    const error = new Error(`it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`);
    error.status = 403;
    // Can only place order between OPENINGHOUR AND CLOSINGHOUR
    if (moment().hour() >= process.env.OPENINGHOUR && moment().hour() <= process.env.CLOSINGHOUR) {
      return next();
    }

    return next(error);
  }
}

export default CheckTime;
