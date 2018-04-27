import chai from 'chai';
import chaiHttp from 'chai-http';
import menus from '../server/model/menudb';
import meals from '../server/model/mealsdb';
import app from '../server/app';

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /api/v1/menus', () => {

  it('should return status code 200 and return all menu', (done) => {

    chai.request(app.listen())
      .get('/api/v1/menus')
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(200);
        expect('content-type', /json/);
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('menus');
        res.body.menus.should.be.an('array');

        done();
      });
  });
  it('Menus returned should have right properties', (done) => {

    chai.request(app.listen())
      .get('/api/v1/menus')
      .end((err, res) => {
        res.body.menus.should.be.an('array');
        res.body.menus.forEach(menu => {
          menu.should.be.an('object');
          menu.should.have.property('id');
          menu.should.have.property('date');
          menu.should.have.property('meals');
          menu.id.should.be.a('number');
          menu.date.should.be.a('string');
          menu.meals.should.be.an('array');
        });

        done();
      });
  });

  describe('GET /api/v1/menus/:DD/:MM/:YYYY', () => {

    it('should return status code 200', (done) => {

      chai.request(app.listen())
        .get('/api/v1/menus/26/04/2018')
        .end((err, res) => {
          // console.log(res);
          res.status.should.equal(200);
          expect('content-type', /json/);
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.should.have.property('menu');
          res.body.menu.should.be.an('object');
          res.body.menu.should.not.be.an('array');
          done();
        });
    });

    it('Menu returned should have right properties if menu date exist', (done) => {
      chai.request(app.listen())
        .get('/api/v1/menus/26/04/2018')
        .end((err, res) => {
          res.body.menu.should.be.an('object');
          res.body.menu.should.have.property('id');
          res.body.menu.should.have.property('date');
          res.body.menu.should.have.property('meals');
          res.body.menu.id.should.be.a('number');
          res.body.menu.date.should.be.a('string');
          res.body.menu.meals.should.be.an('array');

          done();
        });
    });
    it('should return 404 if menu date do not exist', (done) => {
      chai.request(app.listen())
        .get('/api/v1/meals/30/04/2018')
        .end((err, res) => {
          res.status.should.equal(404);

          done();
        });
    });

  });
});

describe('POST /api/v1/menus', () => {

  it('should return status code 400', (done) => {

    chai.request(app.listen())
      .post('/api/v1/menus')
      .send({
        date: "27/04/2018",
        meals: []
      })
      .end((err, res) => {
        // console.log(res);
        res.status.should.equal(400);
       
      });
    done();
  });

  it('should return a list of all menu with new menu', (done) => {

  chai.request(app.listen())
    .post('/api/v1/menus')
    .send({
      date: '27/04/2018',
      meals: [1, 2, 5]
    })
    .end((err, res) => {
      res.status.should.equal(201);
      expect('content/type', /JSON/);
      res.body.should.be.an('object');
      res.body.menus.should.be.an('array');
      res.body.menus[res.body.menus.length - 1].should.have.property('id');
      res.body.menus[res.body.menus.length - 1].should.have.property('date');
      res.body.menus[res.body.menus.length - 1].should.have.property('meals');
      res.body.menus[res.body.menus.length - 1].id.should.be.a('number');
      res.body.menus[res.body.menus.length - 1].date.should.be.a('string');
      res.body.menus[res.body.menus.length - 1].meals.should.be.a('array');


    });

  done();
  });
});

