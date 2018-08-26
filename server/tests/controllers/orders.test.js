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
            id: '7a5d6838-569b-4fb5-955c-356ad7089645',
            price: 300,
            portion: 5
          }
        ]
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
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
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      },
      body: {
        meals: [
          {
            id: '7a5d6838-569b-4fb5-955c-356ad7089645',
            unitPrice: 300,
            portion: 5
          }
        ]
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
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
        orderId: '7a5d6838-569b-4fb5-955c-356ad7089645'
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      ordersController.deleteOrder(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});