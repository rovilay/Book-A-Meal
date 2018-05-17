import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../../models/index';
import mealData from '../helpers/test-data/meals';
import getToken from '../helpers/gettokens';


const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Meals API routes', (done) => {
  const admin = {
    id: 'daf7db8c-b32a-4e69-9e2b-8aa7a3b076a0',
    admin: true
  };

  const customer = {
    id: '618ef639-4729-4256-bdf4-54ff2e6a61d9',
    admin: false
  };

  const adminToken = getToken(admin);
  const customerToken = getToken(customer);

  describe('POST /api/v1/meals', (done) => {
    it('should post meals to db if admin', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', adminToken)
        .send(mealData[0])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal('Meal added successfully');
          if (err) return err;
          done();
        });
    });

    it('should not allow customer', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', customerToken)
        .send(mealData[1])
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('User not allowed!');
          done();
        });
    });

    it('should check for incomplete meal input', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', adminToken)
      .send({
        title: 'Bread and butter',
        description: 'So sweet',
        image: 'https://image.com'
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('price field is empty');

        done();
      });
    });
  });

  describe('GET /api/v1/meals', (done) => {
    it('should return all meals in database if admin', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meals retrieved successfully');
        res.body.should.have.property('meals');
        res.body.meals.should.be.an('array');
        res.body.meals.forEach(meal => {
          meal.should.be.an('object');
          meal.should.have.property('id');
          meal.should.have.property('title');
          meal.should.have.property('description');
          meal.should.have.property('price');
          meal.should.have.property('image');
          meal.should.have.property('UserId');
          meal.title.should.be.a('string');
          meal.description.should.be.a('string');
          meal.image.should.be.a('string');
          meal.price.should.be.a('number');
        });

        done();
      });
    });

    it('should not allow customers', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/meals/:id', (done) => {
    it('should return a single meal if id specified', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185c4c8')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Meal retrieved successfully');
        res.body.should.have.property('meal');
        res.body.meal.should.be.an('object');
        res.body.meal.should.have.property('id');
        res.body.meal.should.have.property('title');
        res.body.meal.should.have.property('description');
        res.body.meal.should.have.property('price');
        res.body.meal.should.have.property('image');
        res.body.meal.title.should.be.a('string');
        res.body.meal.description.should.be.a('string');
        res.body.meal.image.should.be.a('string');
        res.body.meal.price.should.be.a('number');
      
        done();
      });
    });

    it('should return 404 if meal do not exist', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185ffff')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should not allow customers get a meal', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('PUT /api/v1/meals/:id', (done) => {
    it('should update meal if meal exist', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', adminToken)
      .send(mealData[1])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Update successful!');
        res.body.should.have.property('updatedMeal');
        expect(res.body.updatedMeal.title).to.equal('SHARWAMA');
        expect(res.body.updatedMeal.description).to.equal('So delicious');
        expect(res.body.updatedMeal.price).to.equal(900);
        res.body.updatedMeal.should.have.property('image');
        res.body.updatedMeal.should.have.property('UserId');
        done();
      });
    });

    it('should return error if meal not found', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/3')
      .set('Authorization', adminToken)
      .send(mealData[0])
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while updating meal!');

        done();
      });
    });

    it('should not allow customer update', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', customerToken)
      .send(mealData[0])
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should check for incomplete meal input', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', adminToken)
      .send({
        description: 'So sweet',
        price: 900,
        image: 'https://image.com'
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        // expect(res.body.success).to.equal(false);
        // expect(res.body.message).to.equal('title field is empty');
        done();
      });
    });
  });

  describe('DELETE /api/v1/meals/:id', (done) => {
    it('should delete specified meal', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/dea6b55b-a9d3-424c-8cfa-e6581185c4c8')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should not allow customer delete', (done) => {
      chai.request(app.listen())
      .del('/api/v1/meals/4b62aed4-2610-4340-97ae-c27a8136c2ff')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        // expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });
  });
});