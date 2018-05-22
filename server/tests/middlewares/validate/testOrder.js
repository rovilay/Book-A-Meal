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
  const req1 = mockReq({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: ""
    }
  });

  const req2 = mockReq({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: []
    }
  });
  const req3 = mockReq({
    body: {
      deliveryAddress: "123 XXXXX",
      meals: [
        {
          id: "",
          portion: 7
        }
      ]
    }
  });
  const next = sinon.spy();
  const res = mockRes();

  it('should return next on err', () => {
    validateOrder(req1, res, next);
    expect(next).to.have.been.called;
  });

  it('should return next on err', () => {
    validateOrder(req2, res, next);
    expect(next).to.have.been.called;
  });

  it('should return next on err', () => {
    validateOrder(req3, res, next);
    expect(next).to.have.been.called;
  });
});
