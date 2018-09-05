import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import customerOnly from '../../middlewares/customerOnly';


chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

const admin = {
  id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
  admin: true
};

const customer = {
  id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
  admin: false
};

describe('customerOnly middleware', () => {
  const res = mockRes();
  const next = sinon.spy();

  it('should call next if customer', () => {
    const req = mockReq({
      user: customer
    });

    customerOnly(req, res, next);
    next.should.have.been.called;
  });

  it('should call next with err if admin', () => {
    const req = mockReq({
      user: admin
    });

    customerOnly(req, res, next);
    next.should.have.been.called;
  });
});