import { userDataDefaultState, loginReducer } from '../../reducers/loginReducer';
import { setUserData, logOutUser } from '../../actions/loginActions';
import { user, userDataOnSuccess } from '../__mockData__/userMock';

describe('Login reducers', () => {
  it('should update user state if login is successful', (done) => {
    const action = setUserData({ ...user, success: true, message: 'You are logged in!' });
    const newState = loginReducer(userDataDefaultState, action);
    expect(newState).toEqual({
      user: {
        ...userDataOnSuccess,
        id: '3af04159-9a93-4b15-a749-e79e680a3daa',
        admin: true,
        expire: ''
      }
    });

    done();
  });

  it('should update user nstate if login is successful', (done) => {
    const action = logOutUser();
    const newState = loginReducer(userDataDefaultState, action);
    expect(newState).toEqual(userDataDefaultState);

    done();
  });


  it('should return default state for unknown action type', (done) => {
    const action = {
      type: undefined,
    }
    const newState = loginReducer(userDataDefaultState, action);
    expect(newState).toEqual(userDataDefaultState);

    done();
  });
});
