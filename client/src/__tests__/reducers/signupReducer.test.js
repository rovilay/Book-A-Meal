import { signUpReducersDefaultState, signUpReducer } from '../../reducers/signupReducer';
import { setSuccessfulSignUpMsg } from '../../actions/signupActions';


describe('Signup reducers', () => {
  it('should update state if signup is successful', (done) => {
    const action = setSuccessfulSignUpMsg('signup successful!');
    const newState = signUpReducer(signUpReducersDefaultState, action);
    expect(newState.signUpSuccess).toEqual({
      success: true,
      message: 'signup successful!'
    });

    done();
  });


  it('should return default state for unknown action type', (done) => {
    const action = {
      type: undefined,
    }
    const newState = signUpReducer(signUpReducersDefaultState, action);
    expect(newState).toEqual(signUpReducersDefaultState);

    done();
  });
});
