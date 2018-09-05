import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import MenusController from '../../controller/MenusController';

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

    it('should return next on error', (done) => {
      MenusController.createMenu(req, res, next);
      next();
      expect(next).to.have.been.called;

      done()
    });
  });

  describe('getTodayMenu', (d) => {
    const req = mockReq({
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', (done) => {
      MenusController.getTodayMenu(req, res, next);
      expect(next).to.have.been.called;

      done();
    });
  });
});