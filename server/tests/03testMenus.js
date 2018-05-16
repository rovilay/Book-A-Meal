import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../../models/index';
import mealData from '../helpers/test-data/meals';
import menuData from '../helpers/test-data/menus';
import getToken from '../helpers/gettokens';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Menus API routes', (done) => {
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

  before((done) => {
    db.Meal.create( mealData[3]) // add meal to db
    .then(() => done())
    .catch((err) => { 
      done(err);
    });
  });

  describe('GET /api/v1/menus', (done) => {
    it('should get all menus', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menus retrieved successfully');
        res.body.menus.should.be.an('array');
        res.body.menus.forEach(menu => {
          menu.should.be.an('object');
          menu.should.have.property('id');
          menu.should.have.property('postOn');
          menu.should.have.property('UserId');
          menu.should.have.property('User');
          menu.should.have.property('Meals');
          menu.Meals.should.be.an('array');
        });
        done();
      });
    });

    it('should not allow customer', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        // expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/menus/:DD/:MM/:YYYY', (done) => {
    it('should get menus on specified date only', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/16/05/2018')
      .set('Authorization', adminToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu retrieved successfully');
        res.body.menu.should.be.an('array');
        res.body.menu.forEach(menu => {
          menu.should.be.an('object');
          menu.should.have.property('id');
          menu.should.have.property('postOn');
          menu.postOn.should.equal('2018-05-16');
          menu.should.have.property('UserId');
          menu.should.have.property('User');
          menu.should.have.property('Meals');
          menu.Meals.should.be.an('array');
        });
        done();
      });
    });

    it('should allow customers', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/17/05/2018')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu retrieved successfully');
        done();
      });
    });

    it('should return error if menu date not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/30/05/2018')
      .set('Authorization', customerToken)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Could not get menu on date: 2018-05-30');
        done();
      });
    });
  });

  describe('POST /api/v1/menus', (done) => {
    it('should add menu only if admin', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', adminToken)
      .send(menuData[0])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow customers post menu', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', customerToken)
      .send()
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        // expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if input not correct', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', adminToken)
      .send({
        postOn: '',
        meals: [
          'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
          '4b62aed4-2610-4340-97ae-c27a8136c2ff'
        ]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        // expect(res.body.success).to.equal(false);
        // expect(res.body.message).to.equal('postOn field is empty');
        done();
      });
    });
  });
});

