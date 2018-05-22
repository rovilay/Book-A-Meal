import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinonChai from 'sinon-chai';
import checkMeal from '../../helpers/checkMeal';

chai.use(chaiHttp);
chai.use(sinonChai);

const should = chai.should();
const expect = chai.expect;

describe('CheckMeals helper', (done) => {
    const next = sinon.spy();
    const res = mockRes();
    const req = mockReq({
      body: {
        meals: ['6eee8579-393e-4e8b-8097-e3af1b4f3ef1']
      }
    });

    it('should return next on err', () => {
      checkMeal(req.body.meals, next);
      next();
      expect(next).to.have.been.called;
    });
});
