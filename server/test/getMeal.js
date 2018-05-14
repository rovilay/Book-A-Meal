import chai from 'chai';
import chaiHttp from 'chai-http';

import db from '../../models/index';
import app from '../app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('API routes', () => {
  // beforeEach(done => {
  //   db.sequelize.sync({ force: true, match: /-test$/ });
  // })
  // .then(() => {
  //   return seed();
  // })
  // .then(() => done())
  // .catch(err => err);

  const user = {
    firstName: 'John',
    lastName: 'Palmer',
    email: 'john@gmail.com',
    password: '1234567',
    address: '1 john street',
    Phone: '0909090909',
    city: 'ikeja',
    state: 'lagos',
    admin: true
  };

  describe('POST /api/v1/signup', (done) => {
    afterEach(() => {
      db.User.drop();
    })
    it('should sign up a user', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
    });
  });
}); 