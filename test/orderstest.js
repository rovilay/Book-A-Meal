import chai from 'chai';
import chaiHttp from 'chai-http';
import meals from '../server/model/ordersdb';
import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /api/v1/meals', () => {

  it('should return status code 400 for wrong input', (done) => {

    chai.request(app.listen())
      .post('/api/v1/orders')
      .send({
        name: "ogooluwa"
      })
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(400);
        done();
      });
  });

  it('should return a list of all orders with new order', (done) => {

  chai.request(app.listen())
    .post('/api/v1/orders')
    .send({
      name: 'Akinola',
      meals: [{id: 1, portion: 2, totalprice: 1400}]
    })
    .end((err, res) => {
      res.status.should.equal(201);
      expect('content/type', /JSON/);
      res.body.should.be.an('object');
      res.body.orders.should.be.an('array');
      res.body.orders[res.body.orders.length - 1].should.have.property('id');
      res.body.orders[res.body.orders.length - 1].should.have.property('date');
      res.body.orders[res.body.orders.length - 1].should.have.property('meals');

    });

  done();
  });
});