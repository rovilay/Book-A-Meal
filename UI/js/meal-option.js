
// Ui control
const UICtrl = (function () {
  const UISelectors = {
    alert: '#alert',
    greet: '#greetings',
    icons: '.icons',
    card: '.card',
    cardBody: '.form-card',
    formTitle: '#form-title',
    form: '#meal-form',
    date: '#date',
    meal: '#meal',
    addBtn: '#add-btn',
    updateBtn: '#update-btn',
    deleteBtn: '#delete-btn',
    backBtn: '#back-btn',
    displaySection: '#display-section',
    displayContainer: '#meal-display',
    displayTitle: '#display-title',
    mealList: '#meal-list',
    mealCount: '#meal-count',
    clearBtn: '#clear-btn',
    mealCard: '.meal-card'
  };

  // Public methods
  return {

    getUISelectors () {
      return UISelectors;
    },

    getFormInputs () {
      return {
        date: document.querySelector(UISelectors.date).value,
        meal: document.querySelector(UISelectors.meal).value,
      };

    },

    showAlert (tagid, msg, className) {
      const alert = document.querySelector(tagid);

      alert.className = className;
      alert.innerText = msg;
    },

    clearAlert (id) {
      const alert = document.querySelector(id);

      setTimeout(function () {
        alert.className = "";
        alert.innerText = "";
      }, 5000);
    },


    hideMealListHeader () {
      document.querySelector(UISelectors.displayTitle).style.display = 'none';
    },

    getCurrentDate() {
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();

        let newDate = new Date(`${year}-${month}-${day}`);
        return newDate
      },

    clearFormInput () {
      document.querySelector(UISelectors.date).value = '';
      document.querySelector(UISelectors.meal).value = '';
    },

    clearEditState () {
      // Change form Title
      document.querySelector(UISelectors.formTitle).innerText = 'Add Meal';
      // Change buttons state
      UICtrl.clearFormInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },

    showEditState () {
      // Change form Title
      document.querySelector(UISelectors.formTitle).innerText = 'Edit Meal';
      // Change buttons state
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';
    },
  };
}());


// App Controller
const AppCtrl = (function (UICtrl) {
  // Get UI selectors
  const UISelectors = UICtrl.getUISelectors();

  // Load Event listeners
  const loadEventListeners = function () {
    // Toggle edit state
    document.querySelector(UISelectors.mealCard).addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-edit')) {
        if(document.querySelector(UISelectors.formTitle).innerText === 'Add Meal') {
          UICtrl.showEditState();
        } else if(document.querySelector(UISelectors.formTitle).innerText === 'Edit Meal') {
          UICtrl.clearEditState()
        }
      }

      e.preventDefault();
    });

    // back btn events
    document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnSubmit);
  };


  const backBtnSubmit = function (e) {
    UICtrl.clearEditState();

    UICtrl.clearFormInput();

    e.preventDefault();
  };

  // Public methods
  return {

    init () {
      // Set Initial state
      UICtrl.clearEditState();

      // set current date
      document.querySelector(UISelectors.date).valueAsDate = new Date()

      let today = new Date().toISOString().substr(0, 10);
      document.querySelector(UISelectors.date).setAttribute('min', today);


      // Load EventListners
      loadEventListeners();

    }
  };
}(UICtrl));


AppCtrl.init();
