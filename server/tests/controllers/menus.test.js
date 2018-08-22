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
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      menusController.postMenu(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('getTodayMenu', () => {
    const req = mockReq({
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      menusController.getTodayMenu(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});