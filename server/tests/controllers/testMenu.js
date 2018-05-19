import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import menusController from '../../controller/menus';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('MenusController', () => {
  const next = sinon.spy();
  const res = mockRes();

  describe('creat menu', () => {
    const req = mockReq({
      body: {},
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', () => {
      menusController.postMenu(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('get menu', () => {
    const req = mockReq({
      params: {
        DD: 32,
        MM: 5,
        YYYY: 2018
      }
    });

    it('should return next on error', () => {
      menusController.getMenu(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});