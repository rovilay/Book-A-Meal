import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import db from '../../../models';
import getToken from '../../helpers/gettokens';
import userData from '../../helpers/test-data/users';
import {
  unOwnedMeal,
  admin1Meals,
  admin2Meals
} from '../../helpers/test-data/meals';

chai.use(chaiHttp);

const {
  adminUser1,
  adminUser2,
  customerUser1,
} = userData;

describe('Meals API routes', () => {
  before(async () => {
    await db.User.truncate();
    await db.Meal.truncate();
    await db.User.create(adminUser1);
    await db.User.create(adminUser2);
    await db.User.create(customerUser1)
  });

  after(async () => {
    await db.User.truncate();
    await db.Meal.truncate();
  })

  beforeEach(async () => {
    await db.Meal.truncate();
  });

  // token details
  const admin1 = {
    id: adminUser1.id,
    admin: adminUser1.admin
  };

  const admin2 = {
    id: adminUser2.id,
    admin: adminUser2.admin
  };

  const customer = {
    id: customerUser1.id,
    admin: customerUser1.admin
  };

  // get tokens
  const admin1Token = getToken(admin1);
  const admin2Token = getToken(admin2);
  const customerToken = getToken(customer);



  describe('GET /api/v1/meals', () => {
    before(async () => {
      // add id to meals
      const newAdmin1Meals = admin1Meals.map(meal => {
        meal.UserId = adminUser1.id;
        return meal;
      });

      const newAdmin2Meals = admin2Meals.map(meal => {
        meal.UserId = adminUser2.id
        return meal;
      });


      await db.Meal.bulkCreate(newAdmin1Meals);
      await db.Meal.bulkCreate(newAdmin2Meals);
    });

    it('should return all meals that belongs to the admin making the request', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${admin1Token}`)
      .end((err, res) => {
        const { success, message,
            meals, pagination
          } = res.body;

        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'meals', 'pagination');
        expect(success).to.equal(true);
        expect(message).to.equal('Meals retrieved successfully!');
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(10);
        expect(pagination.count).to.equal(7);
        expect(pagination.numOfPages).to.equal(1);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(10);
        expect(meals).to.be.an('array');
        expect(meals.length).to.equal(7);
        meals.forEach(meal => {
          expect(meal).to.be.an('object');
          expect(meal).to.have.all.keys('id', 'title', 'description', 'price', 'image', 'UserId', 'createdAt', 'deletedAt', 'updatedAt');
          expect(meal.title).to.be.a('string');
          expect(meal.description).to.be.a('string');
          expect(meal.image).to.be.a('string');
          expect(meal.price).to.be.a('number');
          expect(meal.UserId).to.be.a('string');
          expect(meal.UserId).to.equal(adminUser1.id);
        });
        expect(meals[0].title).to.equal('CHOCOLATE CAKE');
        done();
      });
    });

    it('should not allow customers get meal', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should not return more than the specified limit in query', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=2&offset=0')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        const { pagination, message, success, meals } = res.body;
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(success).to.equal(true);
        expect(message).to.equal('Meals retrieved successfully!');
        expect(meals).to.be.an('array');
        expect(meals.length).to.equal(2);
        expect(pagination).to.be.an('object');
        expect(pagination).to.have.all.keys('limit', 'offset', 'numOfPages', 'curPage', 'count', 'nextOffset');
        expect(pagination.offset).to.equal(0);
        expect(pagination.limit).to.equal(2);
        expect(pagination.count).to.equal(7);
        expect(pagination.numOfPages).to.equal(4);
        expect(pagination.curPage).to.equal(1);
        expect(pagination.nextOffset).to.equal(2);
        meals.forEach(meal => {
          expect(meal).to.be.an('object');
          expect(meal).to.have.all.keys('id', 'title', 'description', 'price', 'image', 'UserId', 'createdAt', 'deletedAt', 'updatedAt');
          expect(meal.title).to.be.a('string');
          expect(meal.description).to.be.a('string');
          expect(meal.image).to.be.a('string');
          expect(meal.price).to.be.a('number');
          expect(meal.UserId).to.be.a('string');
          expect(meal.UserId).to.equal(adminUser2.id);
        });

        done();
      });
    })

    it('should return error if limit in invlid not a postive integer', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=cbcb&offset=0')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if(err) return done(err);

        expect(res.status).to.equal(400);
        expect(success).to.equal(false);
        expect(message).to.equal('limit must be a number and greater than 0!');

        done();
      });
    })

    it('should return error if offset in invlid not a postive integer', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=5&offset=-1')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        const { message, success } = res.body;
        if(err) return done(err);

        expect(res.status).to.equal(400);
        expect(success).to.equal(false);
        expect(message).to.equal('Offset query must be a number and not be less than 0!');

        done();
      });
    })
  });

  describe('GET /api/v1/meals/:mealId', () => {
    before(async () => {
      // create new meals with id and userId
      const newMeal1 = {
        ...admin2Meals[0],
        id: 'fd5127f5-ac5a-412f-b3c4-6db13695f74b',
        UserId: adminUser1.id
      };

      const newMeal2 = {
        ...admin1Meals[0],
        id: '52df0447-1324-4b8c-bf8d-adf3893ac26b',
        UserId: adminUser2.id
      };

      // await db.Meal.truncate();
      await db.Meal.bulkCreate([newMeal1, newMeal2]);
    });

    it('should return a single meal if created by the admin', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/fd5127f5-ac5a-412f-b3c4-6db13695f74b')
      .set('Authorization', `Bearer ${admin1Token}`)
      .end((err, res) => {
        if(err) return done(err);
        const { success, message, meal } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'meal');
        expect(success).to.equal(true);
        expect(message).to.equal('Meal retrieved successfully!');
        expect(meal).to.be.an('object');
        expect(meal).to.have.all.keys('id', 'title', 'description', 'price', 'image', 'UserId', 'createdAt', 'deletedAt', 'updatedAt');
        expect(meal.title).to.be.a('string');
        expect(meal.description).to.be.a('string');
        expect(meal.image).to.be.a('string');
        expect(meal.price).to.be.a('number');
        expect(meal.UserId).to.be.a('string');
        expect(meal.UserId).to.equal(adminUser1.id);

        done();
      });
    });

    it('should return 404 if meal present but was not created by admin making request', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/fd5127f5-ac5a-412f-b3c4-6db13695f74b')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should return 404 if meal is not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/c54d94d1-cef4-4cb5-b55d-318a50afe605')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should return error if meal id is wrong', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/54d94d1-cef4-4cb5-b55d-318a50afe6') // wrong uuid
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while getting meal!');
        done();
      });
    });

    it('should not allow customers get a meal', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/52df0447-1324-4b8c-bf8d-adf3893ac26b')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('POST /api/v1/meals', () => {

    it('should post meals to db if admin', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send(unOwnedMeal)
        .end((err, res) => {
          const { message, success, meal } = res.body;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.keys('success', 'message', 'meal');
          expect(success).to.equal(true);
          expect(message).to.equal('Meal added successfully!');
          expect(meal.image).to.equal('https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg');
          expect(meal.description).to.equal('Its traditional');
          expect(meal.title).to.equal('EBA AND GBEGIRI');
          expect(meal.price).to.equal(500);
          expect(meal.UserId).to.equal(adminUser1.id);
          if (err) return done(err);

          done();
        });
    });

    it('should not allow customer post meal', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${customerToken}`)
        .send(unOwnedMeal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(403);
          expect(res.body).to.have.all.keys('success', 'message');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User not allowed!');
          done();
        });
    });

    it('should not allow same admin post same meal more than once', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send(unOwnedMeal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.all.keys('success', 'message');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Error, Meal already exist!');
          done();
        });
    });

    it('should allow different admin post same meal', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${admin2Token}`)
        .send(unOwnedMeal)
        .end((err, res) => {
          const { success, message, meal } = res.body;
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.keys('success', 'message', 'meal');
          expect(success).to.equal(true);
          expect(message).to.equal('Meal added successfully!');
          expect(meal.image).to.equal('https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg');
          expect(meal.description).to.equal('Its traditional');
          expect(meal.title).to.equal('EBA AND GBEGIRI');
          expect(meal.price).to.equal(500);
          expect(meal.UserId).to.equal(adminUser2.id);
          done();
        });
    });

    it('should check for incomplete meal input', (done) => {
      unOwnedMeal.price = '' // set value to empty string
      chai.request(app.listen())
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${admin2Token}`)
      .send(unOwnedMeal)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body).to.have.all.keys('success', 'message');
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('price field is empty!');

        done();
      });
    });
  });

  describe('PUT /api/v1/meals/:mealId', () => {
    before(async () => {
      // create new meals with id and userId
      const newMeal1 = {
        ...admin2Meals[2],
        title: 'MOIN MOIN AND EKO',
        id: '2e691b83-7f33-4389-abb4-91170ab9698f',
        UserId: adminUser1.id
      };

      const newMeal2 = {
        ...admin1Meals[2],
        title: 'OGI AND MOIN MOIN',
        id: '18b0fea8-9168-41e6-b35a-be526305ff91',
        UserId: adminUser2.id
      };

      // await db.Meal.truncate();
      await db.Meal.bulkCreate([newMeal1, newMeal2]);
    });

    const updatedNewMeal2 = {
      title: 'Sharwama',
      description: 'So delicious',
      price: 900,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
    };

    it('should update meal if meal exist and belong to the admin', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${admin2Token}`)
      .send(updatedNewMeal2)
      .end((err, res) => {
        if(err) return done(err);
        const { success, message, updatedMeal } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'updatedMeal');
        expect(success).to.equal(true);
        expect(message).to.equal('Update successful!');
        expect(updatedMeal).to.have.all.keys('title', 'price', 'description', 'image', 'UserId');
        expect(updatedMeal.title).to.equal('SHARWAMA');
        expect(updatedMeal.description).to.equal('So delicious');
        expect(updatedMeal.price).to.equal(900);
        expect(updatedMeal.UserId).to.equal(adminUser2.id);

        done();
      });
    });

    it('should return error if id not correct', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/52df0447-1324-4b8c-bf8d') // wrong uuid
      .set('Authorization', `Bearer ${admin2Token}`)
      .send(updatedNewMeal2)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while updating meal!');

        done();
      });
    });

    it('should not allow admin update meal not created by him/her', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${admin1Token}`)
      .send(updatedNewMeal2)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Meal not found!');

        done();
      });
    });

    it('should not allow customer update', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(updatedNewMeal2)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should check for incomplete meal input', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/2e691b83-7f33-4389-abb4-91170ab9698f')
      .set('Authorization', `Bearer ${admin1Token}`)
      .send({
        description: 'So sweet',
        price: 900,
        image: 'https://image.com'
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('title field is empty!');
        done();
      });
    });
  });

  describe('DELETE /api/v1/meals/:id', () => {
    before(async () => {
      // create new meals with id and userId
      const newMeal1 = {
        ...admin2Meals[5],
        title: 'BUNS AND ZOBO',
        id: '1d9529ee-18c1-4db1-86ee-251071615767',
        UserId: adminUser1.id
      };

      const newMeal2 = {
        ...admin1Meals[5],
        title: 'DOUGHNUT AND CREAM',
        id: '33a01894-6608-4c8a-aa17-d5de560184e6',
        UserId: adminUser2.id
      };

      // await db.Meal.truncate();
      await db.Meal.bulkCreate([newMeal1, newMeal2]);
    });

    it('should not allow another admin delete meal not created by him/her', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6') // meals created at put describe block
      .set('Authorization', `Bearer ${admin1Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should not allow customer delete', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6')
      .set('Authorization', `Bearer ${customerToken}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should return error for wrong id', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/4b62aed4-2610-4340-97ae-c27')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Error occurred while deleting meal!');

        done();
      });
    });

    it('should delete meal if created by him/her', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6')
      .set('Authorization', `Bearer ${admin2Token}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  after(async () => {
    await db.Meal.truncate();
  })
});
