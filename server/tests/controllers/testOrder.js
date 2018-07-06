import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import ordersController from '../../controller/orders';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('OrdersController', () => {
  const next = sinon.spy();
  const res = mockRes();

  describe('post order', () => {
    const req = mockReq({
      body: {
        deliveryAddress: null,
        meals: [
          {
            id: 'qwertyuio',
            portion: 5
          }
        ]
      },
      user: {
        id: 'asdfgh'
      }
    });

    const err = new Error('An error occurred, user not created!');

    it('should return next on error', () => {
      ordersController.postOrder(req, res, next);
        next(err);
        next.should.have.been.calledWith(err);
    });
  });

  describe('update order', () => {
    const req = mockReq({
      params: {
        id: 'qwertyu'
      },
      body: {
        meals: [
          {
            id: 'qwertyuio',
            portion: 5
          }
        ]
      },
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', () => {
      ordersController.updateOrder(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('delete order', () => {
    const req = mockReq({
      params: {
        id: 'qwertyuio'
      }
    });

    it('should return next on error', () => {
      ordersController.deleteOrder(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});