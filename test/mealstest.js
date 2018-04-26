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
      .get('/api/v1/meals/1')
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(200);
        expect('content-type', /json/);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('meal');
        res.body.meal.should.be.an('object');
        res.body.meal.should.not.be.an('array');
        done();
      });
  });
  it('Meal returned should have right properties', (done) => {

    chai.request(app.listen())
      .get('/api/v1/meals/1')
      .end((err, res) => {
          meal.should.be.an('object');
          meal.should.have.property('id');
          meal.should.have.property('title');
          meal.should.have.property('description');
          meal.should.have.property('price');
          meal.should.have.property('img');
          meal.id.should.be.a('number');
          meal.title.should.be.a('string');
          meal.description.should.be.a('string');
          parseInt(meal.price).should.be.a('number');
          if(meal.img !== null) {
            meal.img.should.be.a('string');
          }
        
        done();
      });
  });
  
});
describe('GET /api/v1/meals', () => {

  it('should return status code 200', (done) => {

    chai.request(app.listen())
      .get('/api/v1/meals')
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(200);
        expect('content-type', /json/);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('meals');
        res.body.meals.should.be.an('array');
        res.body.meals[0].should.be.an('object');
        done();
      });
  });
  it('Meals returned should have right properties', (done) => {

    chai.request(app.listen())
      .get('/api/v1/meals')
      .end((err, res) => {
        res.body.meals.forEach(meal => {
          meal.should.be.an('object');
          meal.should.have.property('id');
          meal.should.have.property('title');
          meal.should.have.property('description');
          meal.should.have.property('price');
          meal.should.have.property('img');
          meal.id.should.be.a('number');
          meal.title.should.be.a('string');
          meal.description.should.be.a('string');
          parseInt(meal.price).should.be.a('number');

        });
        
        done();
      });
  });
  
});