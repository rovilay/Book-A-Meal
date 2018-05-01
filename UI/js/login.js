const UICtrl = (function () {
  const UISelectors = {
    card: ".card",
    cardBody: ".card-body",
    alert: "#alert",
    admin: "#admin",
    adminCheckbox: "#admin-checkbox",
    loginFormTitle: "#login-form-title",
    loginForm: ".login-form",
    loginInputEmail: "#login-email",
    loginInputPassword: "#login-password",
    remCheckbox: "#remember",
    loginBtn: ".loginbtn",

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

    clearLoginFormInputs: function () {
      document.querySelector(UISelectors.loginInputEmail).value = '';
      document.querySelector(UISelectors.loginInputPassword).value = '';
    },

    validateLoginForm: function () {
      const loginForm = this.getLoginInputs();

      if (loginForm.email === "" || loginForm.password === "") {
        this.showAlert(UISelectors.alert, 'Please fill all astericked (*) fields', 'alert alert-danger');
        return false;
      } else {

        return true;
      }
    },

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

    // login user
    document.querySelector(UISelectors.loginForm).addEventListener('submit', loginUser);

  };

  const loginUser = function (e) {
    if (UiCtrl.validateLoginForm()) {
      UiCtrl.showAlert(UISelectors.alert, 'Login Successful', 'alert alert-success');
      UiCtrl.clearLoginFormInputs();

      // check if admin
      let admin = document.querySelector(UISelectors.adminCheckbox).checked;
      if (admin === true) {
        window.location.assign('create-menu.html')
      } else {
        window.location.assign('menu.html');
      }


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