import signupValidator from '../../helpers/signupValidator';

describe('signupValidator helper', () => {
  it('should return `true` if all fields are filled correctly', (done) => {
    document.body.innerHTML =
    `<div>
      <input id="signup-fname" value="john" />
      <input id="signup-lname" value="john" />
      <input id="signup-email" value="johndoe@email.com" />
      <input id="signup-role" value="customer" />
      <input id="signup-phone" value="0987654321" />
      <input id="signup-address" value="amity" />
      <input id="signup-psw" value="1234567" />
      <input id="signup-cpsw" value="1234567" />
      <input id="signup-city" value="ikeja" />
      <input id="signup-state" value="lagos" />
    </div>`;
    const valid = signupValidator();
    expect(valid).toEqual(true);

    done();
  });

  it('should return `false` if an input field is empty', (done) => {
    document.body.innerHTML =
    `<div>
      <input id="signup-fname" value="john" />
      <input id="signup-lname" value="john" />
      <input id="signup-email" value="johndoe@email.com" />
      <input id="signup-role" value="customer" />
      <input id="signup-phone" value="0987654321" />
      <input id="signup-address" value="amity" />
      <input id="signup-psw" value="1234567" />
      <input id="signup-cpsw" value="" />
      <input id="signup-city" value="ikeja" />
      <input id="signup-state" value="lagos" />
    </div>`;
    const valid = signupValidator();
    expect(valid).toEqual(false);

    done();
  });


  it('should return `false` if password and confirm password is not the same', (done) => {
    document.body.innerHTML =
    `<div>
      <input id="signup-fname" value="john" />
      <input id="signup-lname" value="john" />
      <input id="signup-email" value="johndoe@email.com" />
      <input id="signup-role" value="customer" />
      <input id="signup-phone" value="0987654321" />
      <input id="signup-address" value="amity" />
      <input id="signup-psw" value="1234567" />
      <input id="signup-cpsw" value="12345" />
      <input id="signup-city" value="ikeja" />
      <input id="signup-state" value="lagos" />
    </div>`;
    const valid = signupValidator();
    expect(valid).toEqual(false);

    done();
  });
});
