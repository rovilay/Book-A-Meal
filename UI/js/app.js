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
    signUpInputpsw: "#signup-psw",
    signUpInputcpsw: "#signup-pswd",
    remCheckbox: "#remember",
    loginBtn: ".loginbtn",
    signUpBtn: ".signupbtn"
  };

  return {
    getUISelectors: function () {
      return UISelectors;
    },

    checkUser: function (id) {
      const checkboxId = id;
      const checkbox = document.querySelector(checkboxId);
      if (checkbox.checked) {
        const user = 'admin';
        checkbox.setAttribute("value", "admin")
      } else {
        checkbox.setAttribute("value", "customer")
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
    }
  };
})();

const AppCtrl = (function (UICtrl) {
  const UiCtrl = UICtrl;
  const UISelectors = UICtrl.getUISelectors();

  const LoadEventListeners = function () {
    const adminCheckbox = document.querySelector(UISelectors.adminCheckbox);

    adminCheckbox.addEventListener('click', function (e) {
      UiCtrl.checkUser(UISelectors.adminCheckbox);

      if (adminCheckbox.value === "admin") {
        UiCtrl.showAdminForm();
      } else {
        UiCtrl.showCustomerForm();
      }
    });

    document.querySelector(UISelectors.signUpLink).addEventListener('click', function (e) {
      UiCtrl.showSignUpForm();

      e.preventDefault();
    });

    document.querySelector(UISelectors.loginLink)
      .addEventListener('click', function (e) {
        UiCtrl.hideSignUpForm();
        UiCtrl.backToLoginPage();


        e.preventDefault();
      });
    };
  return {
    init: function () {
      UiCtrl.hideSignUpForm();

      LoadEventListeners();
    }
  };
})(UICtrl);

AppCtrl.init();