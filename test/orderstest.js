import chai from 'chai';
import chaiHttp from 'chai-http';
import meals from '../server/model/mealsdb';
import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /api/v1/meals', () => {

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

describe('PUT /api/v1/meals/:id', () => {
  it('should return status code 404', (done) => {
    chai.request(app.listen())
      .put('/api/v1/meals')
      .send({
        title: 'Rice and Chicken',
        description: 'Very Good',
        price: 700,
        image: 'hp.image.com'
      })
      .end((err, res) => {
        res.status.should.equal(404);
      });
    done();
  });

  it('should return status code 404', (done) => {
    chai.request(app.listen())
      .put('/api/v1/meals/2')
      .send({
        title: 'Rice and Chicken',
        price: 700,
        image: 'hp.image.com'
      })
      .end((err, res) => {
        res.status.should.equal(404);
        expect('content/type', /json/);
        res.body.message.should.equal('description is required!');
      });
    done();
  });

  it('should update specified id order', (done) => {
    chai.request(app.listen())
      .put('/api/v1/meals/2')
      .send({
        title: 'Rice and Chicken',
        description: 'So delicious',
        price: 700,
        image: 'hp.image.com'
      })
      .end((err, res) => {
        res.status.should.equal(201);
        expect('content/type', /json/);
        res.body.should.be.an('object');
        res.body.message.should.equal('Meal updated successfully!');
        res.body.meals.should.be.an('array');
        res.body.meals[2].title.should.equal('Rice and Chicken');
      });
    done();
  });
});