const UICtrl = (function () {
  const UISelectors = {
    card: ".card",
    cardBody: ".card-body",
    alert: "#alert",
    signUpForm: ".signup-form",
    signUpInputFname: "#signup-fname",
    signUpInputLname: "#signup-lname",
    signUpInputEmail: "#signup-email",
    signUpInputPhone: "#signup-phone",
    signUpInputPhone2: "#signup-phone2",
    signUpInputAddress: "#signup-address",
    signUpInputAddress2: "#signup-address2",
    signUpInputCity: "#signup-city",
    signUpInputState: "#signup-state",
    signUpInputPsw: "#signup-psw",
    signUpInputCpsw: "#signup-cpsw",
    signUpBtn: ".signupbtn"
  };

  return {
    getUISelectors: function () {
      return UISelectors;
    },

    showAlert: function (id, msg, className) {
      const alert = document.querySelector(id);

      alert.className = className;
      alert.innerText = msg;
    },

    clearAlert: function (id) {
      const alert = document.querySelector(id);

      setTimeout(function () {
        alert.className = "";
        alert.innerText = "";
      }, 5000);
    },


    getSignUpFormInputs: function() {
      const firstname = document.querySelector(UISelectors.signUpInputFname).value;
      const lastname = document.querySelector(UISelectors.signUpInputLname).value;
      const email = document.querySelector(UISelectors.signUpInputEmail).value;
      const phone = document.querySelector(UISelectors.signUpInputPhone).value;
      const phone2 = document.querySelector(UISelectors.signUpInputPhone2).value;
      const address = document.querySelector(UISelectors.signUpInputAddress).value;
      const address2 = document.querySelector(UISelectors.signUpInputAddress2).value;
      const city = document.querySelector(UISelectors.signUpInputCity).value;
      const state = document.querySelector(UISelectors.signUpInputState).value;
      const password = document.querySelector(UISelectors.signUpInputPsw).value;
      const confirmPassword = document.querySelector(UISelectors.signUpInputCpsw).value;

      return {
        firstname,
        lastname,
        email,
        phone,
        phone2,
        address,
        address2,
        city,
        state,
        password,
        confirmPassword
      };
    },

    clearSignUpFormInputs: function() {
      document.querySelector(UISelectors.signUpInputFname).value = '';
      document.querySelector(UISelectors.signUpInputLname).value = '';
      document.querySelector(UISelectors.signUpInputEmail).value = '';
      document.querySelector(UISelectors.signUpInputPhone).value = '';
      document.querySelector(UISelectors.signUpInputPhone2).value = '';
      document.querySelector(UISelectors.signUpInputAddress).value = '';
      document.querySelector(UISelectors.signUpInputAddress2).value = '';
      document.querySelector(UISelectors.signUpInputCity).value = '';
      document.querySelector(UISelectors.signUpInputState).value = '';
      document.querySelector(UISelectors.signUpInputPsw).value = '';
      document.querySelector(UISelectors.signUpInputCpsw).value = '';
    },

    validateSignUpForm: function(e) {
      const signUpForm = this.getSignUpFormInputs();

      if(signUpForm.firstname === "" || signUpForm.lastName === "" || signUpForm.email === "" || signUpForm.address === "" || signUpForm.phone === "" || signUpForm.state === "" || signUpForm.city === "" || signUpForm.password === "" || signUpForm.confirmPassword === "" ) {
        this.showAlert(UISelectors.alert, 'Please fill all astericked (*) fields', 'alert alert-danger');

        
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 1); // scroll to top;
        
        return false;

      } 
      
      if(signUpForm.password !== signUpForm.confirmPassword) {
        this.showAlert(UISelectors.alert, 'Password not the same!', 'alert alert-danger');
        // scroll to top
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 1);

        e.preventDefault();
        return false;
      }

      return true; 
    }
  };
})();

const AppCtrl = (function (UICtrl) {
  const UiCtrl = UICtrl;
  const UISelectors = UICtrl.getUISelectors();

  const LoadEventListeners = function () {

      // signup vistor
      document.querySelector(UISelectors.signUpForm).addEventListener('submit', signUpUser);
    

  };

    const signUpUser = function(e) {
      if(UiCtrl.validateSignUpForm(e)) {
        UiCtrl.showAlert(UISelectors.alert, 'Sign Up Successful', 'alert alert-success');
        UiCtrl.clearSignUpFormInputs();
        
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 1);

        setTimeout(function () {
          window.location.assign('login.html');
        }, 100);
        
        e.preventDefault();
      }

      UiCtrl.clearAlert(UISelectors.alert);
    }; 


  return {
    init: function () {

      LoadEventListeners();
    }
  };
})(UICtrl);

AppCtrl.init();