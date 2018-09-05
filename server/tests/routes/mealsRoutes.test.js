import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import db from '../../../models';
import getToken from '../../helpers/getToken';
import users from '../../helpers/test-data/users';
import {
  unOwnedMeal,
  catererJohnMeals,
  catererEstherMeals
} from '../../helpers/test-data/meals';

chai.use(chaiHttp);

const {
  catererJohn,
  catererEsther,
  customerRose,
} = users;

describe('Meals API routes', () => {
  before(async () => {
    await db.User.truncate();
    await db.Meal.truncate();
    await db.User.create(catererJohn);
    await db.User.create(catererEsther);
    await db.User.create(customerRose)
  });

  after(async () => {
    await db.User.truncate();
    await db.Meal.truncate();
  })

  beforeEach(async () => {
    await db.Meal.truncate();
  });

  // token details
  const catererJohnTokenDetails = {
    id: catererJohn.id,
    admin: catererJohn.admin
  };

  const catererEstherTokenDetails = {
    id: catererEsther.id,
    admin: catererEsther.admin
  };

  const customerRoseTokenDetails = {
    id: customerRose.id,
    admin: customerRose.admin
  };

  // get tokens
  const catererJohnToken = getToken(catererJohnTokenDetails);
  const catererEstherToken = getToken(catererEstherTokenDetails);
  const customerRoseToken = getToken(customerRoseTokenDetails);



  describe('GET /api/v1/meals', () => {
    before(async () => {
      // add id to meals
      const newCatererJohnMeals = catererJohnMeals.map(meal => {
        meal.UserId = catererJohn.id;
        return meal;
      });

      const newCatererEstherMeals = catererEstherMeals.map(meal => {
        meal.UserId = catererEsther.id
        return meal;
      });


      await db.Meal.bulkCreate(newCatererJohnMeals);
      await db.Meal.bulkCreate(newCatererEstherMeals);
    });

    it('should return all meals that belongs to the caterer making the request', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${catererJohnToken}`)
      .end((error, res) => {
        const { success, message,
            meals, pagination
          } = res.body;

        if(error) return done(error);
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
          expect(meal.UserId).to.equal(catererJohn.id);
        });
        expect(meals[0].title).to.equal('CHOCOLATE CAKE');
        done();
      });
    });

    it('should not allow customers get meal', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });

    it('should not return meals that is more than the specified limit in query', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=2&offset=0')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        const { pagination, message, success, meals } = res.body;
        if(error) return done(error);
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
          expect(meal.UserId).to.equal(catererEsther.id);
        });

        done();
      });
    })

    it('should return error if limit is not a number', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=cbcb&offset=0')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        const { message, success } = res.body;
        if(error) return done(error);

        expect(res.status).to.equal(400);
        expect(success).to.equal(false);
        expect(message).to.equal('limit must be a number and greater than 0!');

        done();
      });
    })

    it('should return error if offset is a negative number', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals?limit=5&offset=-1')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        const { message, success } = res.body;
        if(error) return done(error);

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
        ...catererEstherMeals[0],
        id: 'fd5127f5-ac5a-412f-b3c4-6db13695f74b',
        UserId: catererJohn.id
      };

      const newMeal2 = {
        ...catererJohnMeals[0],
        id: '52df0447-1324-4b8c-bf8d-adf3893ac26b',
        UserId: catererEsther.id
      };

      // await db.Meal.truncate();
      await db.Meal.bulkCreate([newMeal1, newMeal2]);
    });

    it('should return a single meal if the meal was created by the caterer', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/fd5127f5-ac5a-412f-b3c4-6db13695f74b')
      .set('Authorization', `Bearer ${catererJohnToken}`)
      .end((error, res) => {
        if(error) return done(error);
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
        expect(meal.UserId).to.equal(catererJohn.id);

        done();
      });
    });

    it(`should return 404 status code if meal is
        present but was not created by the caterer making request`, (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/fd5127f5-ac5a-412f-b3c4-6db13695f74b')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should return 404 status code if meal is not found', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/c54d94d1-cef4-4cb5-b55d-318a50afe605')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should return error if meal id is wrong', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/54d94d1-cef4-4cb5-b55d-318a50afe6') // wrong uuid
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(500);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while getting meal!');
        done();
      });
    });

    it('should not allow customers get a meal', (done) => {
      chai.request(app.listen())
      .get('/api/v1/meals/52df0447-1324-4b8c-bf8d-adf3893ac26b')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');
        done();
      });
    });
  });

  describe('POST /api/v1/meals', () => {
    it('should allow caterer create meal', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${catererJohnToken}`)
        .send(unOwnedMeal)
        .end((error, res) => {
          const { message, success, meal } = res.body;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.keys('success', 'message', 'meal');
          expect(success).to.equal(true);
          expect(message).to.equal('Meal added successfully!');
          expect(meal.image).to.equal('https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg');
          expect(meal.description).to.equal('Its traditional');
          expect(meal.title).to.equal('EBA AND GBEGIRI');
          expect(meal.price).to.equal(500);
          expect(meal.UserId).to.equal(catererJohn.id);
          if (error) return done(error);

          done();
        });
    });

    it('should not allow customer create meal', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${customerRoseToken}`)
        .send(unOwnedMeal)
        .end((error, res) => {
          if (error) return done(error);
          expect(res.status).to.equal(403);
          expect(res.body).to.have.all.keys('success', 'message');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('User not allowed!');
          done();
        });
    });

    it('should not allow same caterer create same meal more than once', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${catererJohnToken}`)
        .send(unOwnedMeal)
        .end((error, res) => {
          if (error) return done(error);
          expect(res.status).to.equal(409);
          expect(res.body).to.have.all.keys('success', 'message');
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('Error, Meal already exist!');
          done();
        });
    });

    it('should allow different caterer post same meal', (done) => {
      chai.request(app.listen())
        .post('/api/v1/meals')
        .set('Authorization', `Bearer ${catererEstherToken}`)
        .send(unOwnedMeal)
        .end((error, res) => {
          const { success, message, meal } = res.body;
          if (error) return done(error);
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.keys('success', 'message', 'meal');
          expect(success).to.equal(true);
          expect(message).to.equal('Meal added successfully!');
          expect(meal.image).to.equal('https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg');
          expect(meal.description).to.equal('Its traditional');
          expect(meal.title).to.equal('EBA AND GBEGIRI');
          expect(meal.price).to.equal(500);
          expect(meal.UserId).to.equal(catererEsther.id);
          done();
        });
    });

    it('should return error if price input is empty', (done) => {
      unOwnedMeal.price = '' // set value to empty string
      chai.request(app.listen())
      .post('/api/v1/meals')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .send(unOwnedMeal)
      .end((error, res) => {
        if(error) return done(error);
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
        ...catererEstherMeals[2],
        title: 'MOIN MOIN AND EKO',
        id: '2e691b83-7f33-4389-abb4-91170ab9698f',
        UserId: catererJohn.id
      };

      const newMeal2 = {
        ...catererJohnMeals[2],
        title: 'OGI AND MOIN MOIN',
        id: '18b0fea8-9168-41e6-b35a-be526305ff91',
        UserId: catererEsther.id
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

    it('should update meal if meal exist and belongs to the caterer', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .send(updatedNewMeal2)
      .end((error, res) => {
        if(error) return done(error);
        const { success, message, updatedMeal } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.keys('success', 'message', 'updatedMeal');
        expect(success).to.equal(true);
        expect(message).to.equal('Update successful!');
        expect(updatedMeal).to.have.all.keys('title', 'price', 'description', 'image', 'UserId');
        expect(updatedMeal.title).to.equal('SHARWAMA');
        expect(updatedMeal.description).to.equal('So delicious');
        expect(updatedMeal.price).to.equal(900);
        expect(updatedMeal.UserId).to.equal(catererEsther.id);

        done();
      });
    });

    it('should return error if meal id is incorrect', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/52df0447-1324-4b8c-bf8d') // wrong uuid
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .send(updatedNewMeal2)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(500);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Error occurred while updating meal!');

        done();
      });
    });

    it('should not allow create update meal not created by him/her', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${catererJohnToken}`)
      .send(updatedNewMeal2)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Meal not found!');

        done();
      });
    });

    it('should not allow customer update meal', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/18b0fea8-9168-41e6-b35a-be526305ff91')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .send(updatedNewMeal2)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should return error if meal title field is not present', (done) => {
      chai.request(app.listen())
      .put('/api/v1/meals/2e691b83-7f33-4389-abb4-91170ab9698f')
      .set('Authorization', `Bearer ${catererJohnToken}`)
      .send({
        description: 'So sweet',
        price: 900,
        image: 'https://image.com'
      })
      .end((error, res) => {
        if(error) return done(error);
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
        ...catererEstherMeals[5],
        title: 'BUNS AND ZOBO',
        id: '1d9529ee-18c1-4db1-86ee-251071615767',
        UserId: catererJohn.id
      };

      const newMeal2 = {
        ...catererJohnMeals[5],
        title: 'DOUGHNUT AND CREAM',
        id: '33a01894-6608-4c8a-aa17-d5de560184e6',
        UserId: catererEsther.id
      };

      // await db.Meal.truncate();
      await db.Meal.bulkCreate([newMeal1, newMeal2]);
    });

    it('should not allow another caterer delete meal not created by him/her', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6') // meals created at put describe block
      .set('Authorization', `Bearer ${catererJohnToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Meal not found!');
        done();
      });
    });

    it('should not allow customer delete meal', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6')
      .set('Authorization', `Bearer ${customerRoseToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User not allowed!');

        done();
      });
    });

    it('should return error for wrong meal id', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/4b62aed4-2610-4340-97ae-c27')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Error occurred while deleting meal!');

        done();
      });
    });

    it('should delete meal if created by the caterer', (done) => {
      chai.request(app.listen())
      .delete('/api/v1/meals/33a01894-6608-4c8a-aa17-d5de560184e6')
      .set('Authorization', `Bearer ${catererEstherToken}`)
      .end((error, res) => {
        if(error) return done(error);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  after(async () => {
    await db.Meal.destroy({ force: true, truncate: { cascade: true } });
  })
});
