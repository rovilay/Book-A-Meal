import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import MealsController from '../../controller/MealsController';

chai.use(chaiHttp);
chai.use(sinonChai);

describe('MealsController', () => {
  const next = sinon.spy();
  const res = mockRes();

  describe('add meal', () => {
    const req = mockReq({
      body: {
        title: 'beans'
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      MealsController.addMeal(req, res, next);
      next();
      expect(next).to.have.been.called;
    });
  });

  describe('update meal', () => {
    const req = mockReq({
      params: {
        id: 'qwertyu'
      },
      body: {
        title: 'rice'
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      MealsController.updateMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('delete meal', () => {
    const req = mockReq({
      params: {
        mealId: '7a5d6838-569b-4fb5-955c-356ad7089645'
      },
      user: {
        id: '7a5d6838-569b-4fb5-955c-356ad7089645'
      }
    });

    it('should return next on error', () => {
      MealsController.deleteMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});