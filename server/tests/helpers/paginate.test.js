import chai from 'chai';

import paginate from '../../helpers/paginate';

const expect = chai.expect;

const dummyArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const limit = 2;
let offset = 4;
const count = dummyArr.length

describe('Paginate helper', () => {
  it('should return an pagination info', (done) => {
    const pagination = paginate(limit, offset, count);
    expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
    expect(pagination.offset).to.equal(4);
    expect(pagination.limit).to.equal(2);
    expect(pagination.count).to.equal(10);
    expect(pagination.numOfPages).to.equal(5)
    expect(pagination.curPage).to.equal(3);
    expect(pagination.nextOffset).to.equal(6);

    done();
  });

  it('next offset should be 0 if offset >= count', (done) => {
    offset = 10;

    const pagination = paginate(limit, offset, count);

    expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
    expect(pagination.offset).to.equal(10);
    expect(pagination.limit).to.equal(2);
    expect(pagination.count).to.equal(10);
    expect(pagination.numOfPages).to.equal(5)
    expect(pagination.curPage).to.equal(0);
    expect(pagination.nextOffset).to.equal(0);

    done();
  });
});
