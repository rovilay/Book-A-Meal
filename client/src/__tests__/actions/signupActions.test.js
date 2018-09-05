/* eslint no-undef: 0 */
import mockStore from '../__mockData__/mockStore';
import {
  user,
  signupSuccessResponse,
  signupFailureResponse
} from '../__mockData__/userMock';
import { SET_SIGNUP_SUCCESS } from '../../actions/actiontypes';
import {
  signUp
} from '../../actions/signupActions';
import { signUpReducersDefaultState } from '../../reducers/signupReducer';



describe('Signup Actions test', () => {
  beforeEach(() => { mock.reset(); });

  it('should dispatch `setSuccessfulSignUpMsg` on success', (done) => {
    const store = mockStore(signUpReducersDefaultState);
    mock.onPost('/api/v1/auth/signup', { ...user })
    .reply(201, signupSuccessResponse);

    const expectedAction = {
      type: SET_SIGNUP_SUCCESS,
      isSignUp: signupSuccessResponse
    };

    store.dispatch(signUp(user))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);
    })
    .catch(err => done(err))

    done();
  });


  it('should notify on error', (done) => {
    const store = mockStore(signUpReducersDefaultState);
    mock.onPost('/api/v1/auth/signup', { ...user })
    .reply(400, signupFailureResponse);

    store.dispatch(signUp(user))
    .then(() => {

      expect(notify()).toEqual('toast called')
    })
    .catch(err => done(err))

    done();
  });
})

