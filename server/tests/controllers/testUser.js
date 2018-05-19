import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import usersController from '../../controller/users';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('UsersController', () => {
  const next = sinon.spy();
  const res = mockRes();

  describe('sign up users', () => {
    const req = mockReq({
      body: {
        email: null,
        Phone: null,
        password: null,
        firstName: null,
        lastName: null,
        address: null,
        city: null,
        state: null,
        admin: null
      }
    });

    it('should return next on error', () => {
      usersController.signup(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('Login User', () => {
    const req = mockReq({
      body: {
        email: 'loren@gmail.com'
      }
    });

    it('should return next on error', () => {
      usersController.login(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});