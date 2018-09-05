/* eslint no-undef: 0 */
import mockStore from '../__mockData__/mockStore';
import {
  userDataOnFailure,
  userDataOnSuccess,
  loginSuccessResponse,
  loginFailureResponse,
  user
} from '../__mockData__/userMock';
import { SET_USER_DATA, LOG_OUT_USER } from '../../actions/actiontypes';
import {
  loginUser,
  logOutUser
} from '../../actions/loginActions';
import { userDataDefaultState } from '../../reducers/loginReducer';


describe('Login Actions test', () => {
  beforeEach(() => { mock.reset(); });
  beforeAll(() => { jest.clearAllMocks(); });

  it('should dispatch setUserData on successful login', (done) => {
    const store = mockStore(userDataDefaultState); // mock store

    mock.onPost('/api/v1/auth/login', { email: user.email, password: user.password })
      .reply(200, {
        ...loginSuccessResponse,
        token: adminToken
      });

    const expectedAction = {
      type: SET_USER_DATA,
      userData: { ...userDataOnSuccess, expire: "" }
    };

    localStorage.setItem('jwt', adminToken);
    localStorage.setItem('user', {
      ...user
    })

    store.dispatch(loginUser(user))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(err => done(err))

      done();
  });


  it('should dispatch setUserData on unsuccessful login', (done) => {
    const store = mockStore(userDataDefaultState); // mock store
    mock.onPost('/api/v1/auth/login', { email: user.email, password: user.password })
      .reply(400, {
        ...loginFailureResponse
      });

    const expectedAction = {
      type: SET_USER_DATA,
      userData: { ...userDataOnFailure, expire: "" }
    };

    store.dispatch(loginUser(user))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(err => done(err))

      done();
  });


  it('should setup logOutUser action object', (done) => {
    const action = logOutUser();
    expect(action).toEqual({
      type: LOG_OUT_USER
    });

    done();
  });
});
