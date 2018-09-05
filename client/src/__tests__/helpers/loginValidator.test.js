import loginValidator from '../../helpers/loginValidator';

describe('loginValidator helper', () => {
  it('should return error if email is invalid', (done) => {
    const wrongEmail = 'johnDoe.com'
    const invalid = loginValidator({ email: wrongEmail, password: '1234567' })
    expect(invalid).toEqual('email is invalid')

    done();
  });


  it('should return error if password is empty', (done) => {
    const email = 'johnDoe@gmail.com'
    const invalid = loginValidator({ email, password: '' })
    expect(invalid).toEqual('password field is empty')

    done();
  });


  it('should return `Login` if inputs are correct', (done) => {
    const email = 'johnDoe@gmail.com'
    const valid = loginValidator({ email, password: '1234567' })
    expect(valid).toEqual('Login')

    done();
  });
});
