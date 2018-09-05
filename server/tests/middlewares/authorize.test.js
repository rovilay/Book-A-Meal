import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import authorize from '../../middlewares/authorize';
import getToken from '../../helpers/getToken';

chai.use(chaiHttp);
chai.use(sinonChai);

const user = {
  id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
  admin: false
};

const token = getToken(user);



describe('Authenticate middleware', () => {
  const res = mockRes();

  const reqHeader = mockReq({
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const wrongReqHeader = mockReq({
    headers: {
      authorization: `${token}`
    }
  });

  const wrongReqHeader2 = mockReq({
    headers: {
      authorization: `Bearer asdgrtutjjhkj`
    }
  });

  const emptyReqHeader = mockReq({
    headers: {}
  });

  const next = sinon.spy();

  it('should verify and add user object to req object', () => {
    authorize(reqHeader, res, next);
    expect(reqHeader.user).to.not.equal(undefined);
  });

  it('should verify and and call next', () => {
    authorize(reqHeader, res, next);
    next.should.have.been.called;
  });

  it('should return status 403 if token wrong', () => {
    authorize(wrongReqHeader, res, next);
    next.should.have.been.called;
  });

  it('should return status 403 if token wrong', () => {
    authorize(wrongReqHeader2, res, next);
    next.should.have.been.called;
  });

  it('should return status 403 if token undefined', () => {
    authorize(emptyReqHeader, res, next);
    res.status.should.be.calledWith(400);
    res.json.should.be.calledWith({
      success: false,
      message: 'Token is required!'
    });
  });

});