import moment from 'moment';
import db from '../models/index';

class checkTime {
  static canUpdate(req, res, next) {
    db.Order.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'createdAt'],
    })
      .then((found) => {
        const [createdAt] = [found.dataValues.createdAt]; // Get the time created
        const timeCheck = moment(createdAt).add(2, 'hours') > moment(); // compare expiry time with present time

        if (timeCheck) {
          return next();
        }
        return res.status(403).send({
          success: false,
          message: "You can't modify order anymore",
        });
      })
      .catch(err => res.send(err));
  }

  static canOrder(req, res, next) {
    // Can only place order between 7 a.m. to 6 p.m.
    if (moment().hour() >= 7 && moment().hour() <= 18) {
      return next();
    }

    return res.status(403).send({
      success: false,
      message: `it's ${moment().format('HH:mm')}, we are closed for the day, try again tomorrow!`,
    });
  }
}


export default checkTime;
