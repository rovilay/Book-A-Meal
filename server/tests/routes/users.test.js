import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import db from '../../../models';
import app from '../../app';
import userData from '../../helpers/test-data/users';

chai.use(chaiHttp);

const {
  adminUser1,
  customerUser1,
  incompleteUser,
  unknownUser
} = userData;

describe('Users API routes', () => {
  before(async () => {
    await db.User.truncate();
    await db.User.create(adminUser1);
  });

  after(async () => {
    await db.User.truncate();
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should return error if already email exist', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(adminUser1)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('An error occurred, user already exist!');
        if(err) return done(err);
        done();
      });
    });

    it('should add new user if all credentials are good', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(customerUser1)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(true);
        expect(message).to.equal('user created successfully!');
        if(err) return done(err);
        done();
      });
    });

    it('should not create user if input is incomplete', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(incompleteUser)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('firstName field is empty');
        if(err) return done(err);
        done();
      });
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should not login if email not found', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(unknownUser)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(401);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Email or Password is incorrect!');
        if(err) return done(err);
        done();
      });
    });

    it('should not login if password is incorrect', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(incompleteUser)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(401);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(success).to.equal(false);
        expect(message).to.equal('Email or Password is incorrect!');
        if(err) return done(err);
        done();
      });
    });

    it('should login in user and return token', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send(customerUser1)
      .end((err, res) => {
        const { success, message } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'token', 'userId', 'firstName', 'lastName');
        expect(success).to.equal(true);
        expect(message).to.equal('You are logged in!');
        if(err) return done(err);
        done();
      });
    });
  });
});
