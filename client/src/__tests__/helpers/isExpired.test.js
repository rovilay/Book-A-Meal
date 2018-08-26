import isExpired from '../../helpers/isExpired';

describe('isExpired helper', () => {
  it('should return `true` if time has expired', (done) => {
    const expiredDate = new Date("2018-08-31");
    const expiredDateInSeconds = expiredDate.getTime() / 1000;
    expect(isExpired(expiredDateInSeconds)).toBe(true);

    done();
  });


  it('should return `false` if time is not expired', (done) => {
    const date = new Date();
    const dateInSeconds = date.getTime() * 0.001;
    expect(isExpired(dateInSeconds)).toEqual(false);

    done();
  });
});
