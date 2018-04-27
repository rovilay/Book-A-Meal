import chai from 'chai';
import chaiHttp from 'chai-http';
import meals from '../server/model/mealsdb';
import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /api/v1/orders', () => {

  it('should return status code 200', (done) => {

    chai.request(app.listen())
      .get('/api/v1/orders')
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(200);
        expect('content-type', /json/);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('orders');
        res.body.orders.should.be.an('array');
        res.body.orders[0].should.be.an('object');
        done();
      });
  });

});

describe('PUT /api/v1/orders/:id', () => {
  it('should return status code 404', (done) => {
    chai.request(app.listen())
      .put('/api/v1/orders/2')
      .send({
        meals: ""
      })
      .end((err, res) => {
        res.status.should.equal(404);
        expect('content/type', /json/);
        res.body.message.should.equal('meals is required!');
      });
    done();
  });

  it('should update specified id order', (done) => {
    chai.request(app.listen())
      .put('/api/v1/orders/2')
      .send({
        meals: [{id: 1, portion: 3, totalPrice: 2100}]
      })
      .end((err, res) => {
        res.status.should.equal(201);
        expect('content/type', /json/);
        res.body.should.be.an('object');
        res.body.message.should.equal('Meal updated successfully!');
      });
    done();
  });
});