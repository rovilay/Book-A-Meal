const UICtrl = (function () {
  const UISelectors = {
    card: ".card",
    cardBody: ".card-body",
    alert: "#alert",
    admin: "#admin",
    adminCheckbox: "#admin-checkbox",
    signUpLink: ".signUp-link",
    loginLink: ".login-link",
    loginFormTitle: "#login-form-title",
    signUpFormTitle: "#signup-form-title",
    loginForm: ".login-form",
    signUpForm: ".signup-form",
    loginInputEmail: "#login-email",
    loginInputPassword: "#login-password",
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
    remCheckbox: "#remember",
    loginBtn: ".loginbtn",
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
    checkCheckbox: function (id, val1, val2) {
      const checkboxId = id;
      const checkbox = document.querySelector(checkboxId);
      if (checkbox.checked) {
        checkbox.setAttribute("value", val1);
      } else {
        checkbox.setAttribute("value", val2);
      }
    },

    showAdminForm: function () {
      document.querySelector(UISelectors.loginFormTitle).innerText = "Admin Login";
    },

    showCustomerForm: function () {
      document.querySelector(UISelectors.loginFormTitle).innerText = "Customer Login";
    },

    showSignUpForm: function () {
      document.querySelector(UISelectors.admin).style.display = "none"; // hide admin checkbox

      document.querySelector(UISelectors.signUpLink).style.display = "none"; // hide signuplink

      document.querySelector(UISelectors.loginFormTitle).style.display = "none" // hide login title

      document.querySelector(UISelectors.loginForm).style.display = "none"; // hide login form

      document.querySelector(UISelectors.loginLink).style.display = "block"; // show loginlink

      document.querySelector(UISelectors.signUpFormTitle).style.display = "block"; // hide signup title

      document.querySelector(UISelectors.signUpForm).style.display = "grid"; // show signup form
    },

    backToLoginPage: function () {
      document.querySelector(UISelectors.admin).style.display = "inline"; // hide admin checkbox

      document.querySelector(UISelectors.signUpLink).style.display = "block"; // show signuplink

      document.querySelector(UISelectors.loginFormTitle).style.display = "block"; //  show login title

      document.querySelector(UISelectors.loginForm).style.display = "block"; // show login form
    },

    hideSignUpForm: function () {
      document.querySelector(UISelectors.loginLink).style.display = "none"; // hide loginlink

      document.querySelector(UISelectors.signUpFormTitle).style.display = "none"; // hide signup title

      document.querySelector(UISelectors.signUpForm).style.display = "none"; // hide signup form
    },

    getLoginInputs: function () {
      const user = document.querySelector(UISelectors.adminCheckbox).value;

      const email = document.querySelector(UISelectors.loginInputEmail).value;
      const password = document.querySelector(UISelectors.loginInputPassword).value;
  
      const remember = document.querySelector(UISelectors.remCheckbox).value;

      return {
        user,
        email,
        password,
        remember
      };

      
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

    clearLoginFormInputs: function() {
      document.querySelector(UISelectors.loginInputEmail).value = '';
      document.querySelector(UISelectors.loginInputPassword).value = '';
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

    validateLoginForm: function() {
      const loginForm = this.getLoginInputs();
      const signUpForm = this.getSignUpFormInputs();

      if (loginForm.email === "" || loginForm.password === "") {
        this.showAlert(UISelectors.alert, 'Please fill all astericked (*) fields', 'alert alert-danger');
        return false;
      } else {

        return true;
      }
    },

    validateSignUpForm: function(e) {
      const loginForm = this.getLoginInputs();
      const signUpForm = this.getSignUpFormInputs();

      if(signUpForm.firstname == "" || signUpForm.lastName === "" || signUpForm.email === "" || signUpForm.address === "" || signUpForm.phone === "" || signUpForm.state === "" || signUpForm.city === "" || signUpForm.password === "" || signUpForm.confirmPassword === "" ) {
        this.showAlert(UISelectors.alert, 'Please fill all astericked (*) fields', 'alert alert-danger');

        
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 1); // scroll to top;
        
        return false;

      } 
      
      if(signUpForm.password !== signUpForm.confirmPassword) {
        this.showAlert(UISelectors.alert, 'Password not the same!', 'alert alert-danger');
        console.log(signUpForm.password, signUpForm.confirmPassword);
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
    const adminCheckbox = document.querySelector(UISelectors.adminCheckbox);

    adminCheckbox.addEventListener('click', function (e) {
      UiCtrl.checkCheckbox(UISelectors.adminCheckbox, 'admin', 'customer');

      if (adminCheckbox.value === "admin") {
        UiCtrl.showAdminForm();
      } else {
        UiCtrl.showCustomerForm();
      }
    });


    document.querySelector(UISelectors.remCheckbox)
      .addEventListener('click', function (e) {
      UiCtrl.checkCheckbox(UISelectors.remCheckbox, 'true', 'false');
    });

    document.querySelector(UISelectors.signUpLink).addEventListener('click', function (e) {
      UiCtrl.clearLoginFormInputs();
      UiCtrl.showSignUpForm();

      e.preventDefault();
    });

    document.querySelector(UISelectors.loginLink)
      .addEventListener('click', function (e) {
        UiCtrl.clearSignUpFormInputs();
        UiCtrl.hideSignUpForm();
        UiCtrl.backToLoginPage();


        e.preventDefault();
      });

      // login user
      document.querySelector(UISelectors.loginBtn).addEventListener('click', loginUser);

      // signup vistor
      document.querySelector(UISelectors.signUpBtn).addEventListener('click', signUpUser);
    };

    const loginUser = function(e) {
      if(UiCtrl.validateLoginForm()) {
        UiCtrl.showAlert(UISelectors.alert, 'Login Successful', 'alert alert-success');
        UiCtrl.clearLoginFormInputs();

        e.preventDefault();
      }

      UiCtrl.clearAlert(UISelectors.alert);
    };

    const signUpUser = function(e) {
      if(UiCtrl.validateSignUpForm(e)) {
        UiCtrl.showAlert(UISelectors.alert, 'Sign Up Successful', 'alert alert-success');
        UiCtrl.clearSignUpFormInputs();
        

        e.preventDefault();
      }

      UiCtrl.clearAlert(UISelectors.alert);
    }; 


  return {
    init: function () {
      UiCtrl.hideSignUpForm();

      LoadEventListeners();
    }
  };
})(UICtrl);

AppCtrl.init();