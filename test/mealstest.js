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
          meal.should.have.property('image');
          meal.id.should.be.a('number');
          meal.title.should.be.a('string');
          meal.description.should.be.a('string');
          meal.image.should.be.a('string');
          parseInt(meal.price).should.be.a('number');

        });

        done();
      });
  });

  describe('GET /api/v1/meals/:id', () => {

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
    it('Meal returned should have right properties if id exist', (done) => {
      chai.request(app.listen())
        .get('/api/v1/meals/1')
        .end((err, res) => {
          console.log(res.meal);
          res.body.meal.should.be.an('object');
          res.body.meal.should.have.property('id');
          res.body.meal.should.have.property('title');
          res.body.meal.should.have.property('description');
          res.body.meal.should.have.property('price');
          res.body.meal.should.have.property('image');
          res.body.meal.id.should.be.a('number');
          res.body.meal.title.should.be.a('string');
          res.body.meal.description.should.be.a('string');
          parseInt(res.body.meal.price).should.be.a('number');
          res.body.meal.image.should.be.a('string');


          done();
        });
    });
    it('should return 404 if id do not exist', (done) => {
      chai.request(app.listen())
        .get('/api/v1/meals/15')
        .end((err, res) => {
          res.status.should.equal(404);

          done();
        });
    });

  });

});

describe('POST /api/v1/meals', () => {

  it('should return status code 400', (done) => {

    chai.request(app.listen())
      .post('/api/v1/meals')
      .send({
        title: 'Rice and Chicken',
        price: 700,
        image: 'hp.image.com'
      })
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(400);
        done();
      });
  });

  it('should return a list of all meals with new meal', (done) => {

  chai.request(app.listen())
    .post('/api/v1/meals')
    .send({
      title: 'Rice and Chicken',
      description: 'Very Good',
      price: 700,
      image: 'hp.image.com'
    })
    .end((err, res) => {
      res.status.should.equal(201);
      expect('content/type', /JSON/);
      res.body.should.be.an('object');
      res.body.meals.should.be.an('array');
      res.body.meals[res.body.meals.length - 1].should.have.property('id');
      res.body.meals[res.body.meals.length - 1].should.have.property('title');
      res.body.meals[res.body.meals.length - 1].should.have.property('description');
      res.body.meals[res.body.meals.length - 1].should.have.property('price');
      res.body.meals[res.body.meals.length - 1].should.have.property('image');
      res.body.meals[res.body.meals.length - 1].id.should.be.a('number');
      res.body.meals[res.body.meals.length - 1].title.should.be.a('string');
      res.body.meals[res.body.meals.length - 1].description.should.be.a('string');
      parseInt(res.body.meals[res.body.meals.length - 1].price).should.be.a('number');

    });

  done();
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

  it('should update specified id meal', (done) => {
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

describe('DELETE /api/v1/meals/:id', () => {
  it('should return error 404', (done) => {
    chai.request(app.listen())
    .delete('/api/v1/meals')
    .end((err, res) => {
      res.status.should.equal(404);
    });
    done();
  });

  it('should delete specified id', (done) => {
    chai.request(app.listen())
    .delete('/api/v1/meals/2')
    .end((err, res) => {
      res.status.should.equal(200);
      expect('content/json', /json/);
      res.body.message.should.equal('Meal deleted successfully!');
    });
    done();
  });

  it('should return 404 if id not found', (done) => {
    chai.request(app.listen())
    .delete('/api/v1/meals/12')
    .end((err, res) => {
      res.status.should.equal(404);
      expect('content/json', /json/);
      res.body.message.should.equal(`meal with id 12 does not exist!`);
    });
    done();
  });
});
