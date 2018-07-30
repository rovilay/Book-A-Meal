import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import db from '../../../models/index';
import mealData from '../../helpers/test-data/meals';
import menuData from '../../helpers/test-data/menus';
import getToken from '../../helpers/gettokens';

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
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        const { pagination, message, success, menus } = res.body;
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'menus');
        expect(success).to.equal(true);
        expect(message).to.equal('Menus retrieved successfully');
        expect(menus).be.an('array');
        expect(menus.length).to.be.at.most(10);
        expect(menus.length).to.be.at.least(1);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(2);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        menus.forEach(menu => {
          menu.should.be.an('object');
          expect(menu).to.have.all.keys('id', 'postOn', 'UserId', 'User', 'Meals', 'createdAt', 'updatedAt');
          expect(menu.Meals).to.be.a('string');
        });
        done();
      });
    });

    it('should return a menu for the post on date', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus?postOn=2018-05-16')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        const { pagination, message, success, menus } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'pagination', 'menus');
        expect(success).to.equal(true);
        expect(message).to.equal('Menus retrieved successfully');
        expect(menus).be.an('array');
        expect(menus.length).to.equal(1);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(1);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        menus.forEach(menu => {
          menu.should.be.an('object');
          expect(menu).to.have.all.keys('id', 'postOn', 'UserId', 'User', 'Meals', 'createdAt', 'updatedAt');
          expect(menu.Meals.length).to.equal(1);
        });
        done();
      });
    });

    it('should return error is postOn date format is invalid', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus?postOn=06-07-2018')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if(err) return done(err);

        expect(res.status).to.equal(400);
        expect(success).to.equal(false);
        expect(message).to.equal('06-07-2018 is invalid!, date should be in "YYYY-MM-DD" format!');

        done();
      });
    })

    it('should not allow customer get all menus', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus?postOn=2018-05-16')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('GET /api/v1/menus/:DD/:MM/:YYYY', (done) => {
    it('should get menus on specified date only', (done) => {
      chai.request(app.listen())
      .get('/api/v1/menus/16/05/2018')
      .set('Authorization', `Bearer ${adminToken}`)
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
      .set('Authorization', `Bearer ${customerToken}`)
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
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
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
      .set('Authorization', `Bearer ${adminToken}`)
      .send(menuData[0])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Menu posted successfully!');
        done();
      });
    });

    it('should not allow customers post menu', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(menuData[1])
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error if input not correct', (done) => {
      chai.request(app.listen())
      .post('/api/v1/menus')
      .set('Authorization', `Bearer ${adminToken}`)
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
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('postOn field is empty');
        done();
      });
    });
  });

  describe('PUT /api/v1/menus/:DD/:MM/:YYYY', (done) => {
    it('should update menu only if admin', (done) => {
      chai.request(app.listen())
      .put('/api/v1/menus/18/05/2020')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        meals: [
          'dea6b55b-a9d3-424c-8cfa-e6581185c4c8',
          '4b62aed4-2610-4340-97ae-c27a8136c2ff'
        ]
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Menu updated successfully!');
        done();
      });
    });

    it('should should not update if customer', (done) => {
      chai.request(app.listen())
      .put('/api/v1/menus/19/05/2021')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        meals: ['4b62aed4-2610-4340-97ae-c27a8136c2ff']
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should return error 404 if date menus on date not found', (done) => {
      chai.request(app.listen())
      .put('/api/v1/menus/19/05/2031')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        meals: ['4b62aed4-2610-4340-97ae-c27a8136c2ff']
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Menu for date: 2031-05-19, not found!');
        done();
      });
    });
  });
});

