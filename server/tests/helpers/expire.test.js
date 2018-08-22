import chai from 'chai';
import expire from '../../helpers/expire';

const expect = chai.expect;

const dateToCompare = '1999-07-08'

describe('expire helper', (done) => {
  it('should return true if present date is greater than dateToCompare', (done) => {
    const isExpired = expire(dateToCompare);
    expect(isExpired).to.equal(true);

    done();
  });
});
