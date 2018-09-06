import chai from 'chai';
import isExpired from '../../helpers/isExpired';

const expect = chai.expect;

const dateToCompare = '1999-07-08'

describe('isExpired helper', (done) => {
  it('should return true if present date is greater than dateToCompare', (done) => {
    const expired = isExpired(dateToCompare);
    expect(expired).to.equal(true);

    done();
  });
});
