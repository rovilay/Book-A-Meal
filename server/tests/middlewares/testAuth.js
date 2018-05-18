import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import authenticate from '../../middlewares/authenticate';
import getToken from '../../helpers/gettokens';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

const user = {
  id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
  admin: false
};

const token = getToken(user);



describe('Authenticate middleware', () => {
  const res = mockRes();

  const reqHeader = mockReq({
    headers: {
      authorization: `${token}`
    }
  });

  const wrongReqHeader = mockReq({
    headers: {
      authorization: `asdgrtutjjhkj`
    }
  });

  const emptyReqHeader = mockReq({
    headers: {}
  });

  const next = sinon.spy();

  it('should verify and add user object to req object', () => {
    authenticate(reqHeader, res, next);
    expect(reqHeader.user).to.not.equal(undefined);
  });

  it('should verify and and call next', () => {
    authenticate(reqHeader, res, next);
    next.should.have.been.called;
  });

  it('should return status 401 if token wrong', () => {
    authenticate(wrongReqHeader, res, next);
    next.should.have.been.called;
  });
  
  it('should return status 403 if token undefined', () => {
    authenticate(emptyReqHeader, res, next);
    res.status.should.be.calledWith(403);
    res.json.should.be.calledWith({
      success: false,
      message: 'Token is undefined!'
    });
  });
  
});