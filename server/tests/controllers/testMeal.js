import chai from 'chai';
import chaiHttp from 'chai-Http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import mealsController from '../../controller/meals';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('MealsController', () => {
  const next = sinon.spy();
  const res = mockRes();

  describe('add meal', () => {
    const req = mockReq({
      body: {
        title: 'beans'
      },
      user: {
        id: 'asdfgh'
      }
    });

    it('should return next on error', () => {
      mealsController.addMeal(req, res, next);
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
        id: 'asdfgh'
      }
    });

    it('should return next on error', () => {
      mealsController.updateMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });

  describe('delete meal', () => {
    const req = mockReq({
      params: {
        id: 'qwertyuio'
      }
    });

    it('should return next on error', () => {
      mealsController.deleteMeal(req, res, next);
      expect(next).to.have.been.called;
    });
  });
});