import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import validateOrder from '../../../middlewares/validate/orders';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('validate Order inputs', () => {
  const req = mockReq({
    body: {}
  });
  const next = sinon.spy();
  const res = mockRes();

  it('should return next on err', () => {
    validateOrder(req, res, next);
    expect(next).to.have.been.called;
  });
});
