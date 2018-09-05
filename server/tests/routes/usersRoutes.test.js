import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import db from '../../../models';
import app from '../../app';
import users from '../../helpers/test-data/users';

chai.use(chaiHttp);

const {
  catererJohn,
  customerRose,
  incompleteUser,
  unknownUser
} = users;

describe('Users API routes', () => {
  before(async () => {
    await db.User.truncate();
    await db.User.create(catererJohn);
  });

  after(async () => {
    await db.User.truncate();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should return error if email  already exist', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(catererJohn)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(409);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('An error occurred, user already exist!');
        if(error) return done(error);
        done();
      });
    });

    it('should add new user if all credentials are good', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(customerRose)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(true);
        expect(message).to.equal('user created successfully!');
        if(error) return done(error);
        done();
      });
    });

    it('should not create user if `firstName` field is empty', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(incompleteUser)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('firstName field is empty');
        if(error) return done(error);
        done();
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should not login if email is not found', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(unknownUser)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(404);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Email does not exist!');
        if(error) return done(error);
        done();
      });
    });

    it('should not login if password is incorrect', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(incompleteUser)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(401);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Email or Password is incorrect!');
        if(error) return done(error);
        done();
      });
    });

    it('should login in user and return token', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(customerRose)
      .end((error, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'token', 'userId', 'firstName', 'lastName');
        expect(success).to.equal(true);
        expect(message).to.equal('You are logged in!');
        if(error) return done(error);
        done();
      });
    });
  });
});
