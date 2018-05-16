import chai from 'chai';
import chaiHttp from 'chai-http';

import db from '../../models/index';
import app from '../app';
import userData from '../helpers/test-data/users';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users API routes', () => {
  const newUser = userData[2];
  describe('POST /api/v1/auth/signup', (done) => {
    it('should return error because email exist', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(userData[0])
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('An error occurred, user not created');
        if(err) return done(err);
        done();
      });
    });

    it('should add new user', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('user created successfully!');
        if(err) return done(err);
        done();
      });
    });

    it('should not create user if input is incomplete', (done) => {
      newUser.firstName = '';   // set an input to empty
      chai.request(app.listen())
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        // res.body.should.have.property('success');
        // res.body.should.have.property('message');
        // expect(res.body.success).to.equal(false);
        // expect(res.body.message).to.equal('firstName field is empty');
        if(err) return done(err);
        done();
      });
    });
  });

  describe('POST /api/v1/auth/login', (done) => {
    it('should not login if email not found', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send({ email: 'ro@gmail.com', password: '1234567'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not found!');
        if(err) return done(err);
        done();
      });
    });

    it('should login in user and return token', (done) => {
      chai.request(app.listen())
      .post('/api/v1/auth/login')
      .send({ email: 'rovi@gmail.com', password: '1234567'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('You are logged in!');
        if(err) return done(err);
        done();
      });
    });
  });
}); 