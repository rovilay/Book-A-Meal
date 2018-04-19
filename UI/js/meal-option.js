// storage control
const StorageCtrl = (function () {
  // Public methods
  return {
    storeMeal: function (meal) {
      let mealOptions;
      // Check if any mealOption in Ls
      if (localStorage.getItem('mealOptions') === null) {
        mealOptions = [];
        //Push new meal
        mealOptions.push(meal);
        // Set Ls
        localStorage.setItem('mealOptions', JSON.stringify(mealOptions));
      } else {
        // Get meals from Ls
        mealOptions = JSON.parse(localStorage.getItem('mealOptions'));

        // Push new contact
        mealOptions.push(meal);

        // Arrange by Last Name
        mealOptions = mealOptions.sort(StorageCtrl.sortMealOptions)

        // Reset Ls
        localStorage.setItem('mealOptions', JSON.stringify(mealOptions));
      }
    },

    sortMealOptions: function (a, b) {
      // Use toUpperCase() to ignore character casing
      const mealA = a;
      const mealB = b;

      let comparison = 0;
      if (mealA > mealB) {
        comparison = 1;
      } else if (mealA < mealB) {
        comparison = -1;
      }
      return comparison;
    },

    getMealOptionsFromLs: function () {
      let mealOptions;
      if (localStorage.getItem('mealOptions') === null) {
        mealOptions = [];
      } else {
        mealOptions = JSON.parse(localStorage.getItem('mealOptions'));
      }

      return mealOptions;
    },

    updateMealLs: function (updatedMeal) {
      // let mealOptions= JSON.parse(localStorage.getItem('mealOptions'));
      let mealOptions = this.getMealOptionsFromLs();

      mealOptions.forEach(function (meal, index) {
        if (updatedMeal.id === meal.id) {
          mealOptions.splice(index, 1, updatedMeal);
        }
      });

      localStorage.setItem('mealOptions', JSON.stringify(mealOptions));
    },

    deleteMealFromLs: function (id) {
      // let mealOptions = JSON.parse(localStorage.getItem(''));
      let mealOptions = this.getMealOptionsFromLs();

      mealOptions.forEach(function (meal, index) {
        if (id === meal.id) {
          mealOptions.splice(index, 1);
        }
      });

      localStorage.setItem('mealOptions', JSON.stringify(mealOptions));
    },

    clearAllMealsFromLs: function () {
      localStorage.removeItem('mealOptions');
    }
  };
})();

// Meal control
const MealCtrl = (function () {

  // Meal Contructor
  const Meal = function (mealInfo) {
    this.id = mealInfo.id;
    this.date = mealInfo.date;
    this.mealName = mealInfo.meal;
  };

  // Data Structure and state
  const data = {
    mealOptions: StorageCtrl.getMealOptionsFromLs(),
    currentMeal: null,
  };

  return {
    getData: function () {
      return data.mealOptions;
    },

    addMeal: function (meal) {

      // create meal id
      if (data.mealOptions.length > 0) {
        meal.id = data.mealOptions[data.mealOptions.length - 1].id + 1;
      } else {
        meal.id = 0;
      }

      // create new meal
      newMeal = new Meal(meal);

      // Add new meal to data structure array
      data.mealOptions.push(newMeal);

      return newMeal;
    },

    getMealById: function (id) {
      let found = null;

      // Loop through the meal options list
      data.mealOptions.forEach(function (meal) {
        if (meal.id === id) {
          found = meal;
        }
      });

      return found;
    },

    updateMeal: function (update) {
      let found = null;

      // Loop through the meal list
      data.mealOptions.forEach(function (meal) {
        if (meal.id === data.currentMeal.id) {
          meal.date = update.date;
          meal.mealName = update.mealName;

          found = meal;
        }
      });

      return data.mealOptions;
    },

    deleteMeal: function (id) {
      // Get all id in meal option
      ids = data.mealOptions.map(function (meal) {
        return meal.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.mealOptions.splice(index, 1);
    },

    clearAllMealOptions: function () {
      data.mealOptions = [];
      data.currentMeal = null;
    },

    setCurrentMeal: function (meal) {
      data.currentMeal = meal;
    },

    getCurrentMeal: function () {
      return data.currentMeal;
    },

    logData: function () {
      return data;
    }
  };

})();


// Ui control
const UICtrl = (function () {
  const UISelectors = {
    alert: '#alert',
    greet: '#greetings',
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
    clearBtn: '#clear-btn'
  };

  // Public methods
  return {

    getUISelectors: function () {
      return UISelectors;
    },

    populateMealDisplay: function (mealOptions) {
      let html = ``;
      if (mealOptions.length > 0) {
        let today = new Date().toISOString().substr(0, 10);
        mealOptions.forEach(meal => {
          if(meal.date === today ) {
          html += `<div class="card mb-1 lightGrey edit-mea" id="meal-${meal.id}">
            <span class="h4 edit-meal"><b class='meal-name'>${meal.mealName}</b> &nbsp &nbsp &nbsp  &nbsp ${meal.date}</span>
        </div>`
          }
        });
      }

      if(html !== ``) {
        document.querySelector(UISelectors.displayTitle).style.display = 'block';
      } else {
        document.querySelector(UISelectors.displayTitle).style.display = 'none';  
      }

      // Insert list items
      document.querySelector(UISelectors.mealList).innerHTML = html;

      // Update contact count
      this.updateMealCount();
    },

    updateMealCount: function () {

      let mealOptions = MealCtrl.getData();
      if (mealOptions.length !== 0) {
        let count = 0;
        let today = new Date().toISOString().substr(0, 10);
        mealOptions.forEach(meal => {
          if(meal.date === today) {
            count += 1
          }

        })
        document.querySelector(UISelectors.mealCount).innerText = count;
      } else {
        document.querySelector(UISelectors.mealCount).innerText = 0;
      }
    },

    getFormInputs: function () {
      return {
        date: document.querySelector(UISelectors.date).value,
        meal: document.querySelector(UISelectors.meal).value,
      };

    },

    showAlert: function (tagid, msg, className) {
      const alert = document.querySelector(tagid);

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

    validateForm: function () {
      const form = this.getFormInputs();

      if (form.date === "" || form.meal === "") {
        this.showAlert(UISelectors.alert, 'Please fill all fields!', 'alert alert-danger');
        return false;
      } else {

        return true;
      }
    },


    hideMealListHeader: function () {
      document.querySelector(UISelectors.displayTitle).style.display = 'none';
    },

    getCurrentDate: function() {
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();  

        let newDate = new Date(`${year}-${month}-${day}`);
        console.log(newDate)
        return newDate
      },

    clearMealList: function () {
      document.querySelector(UISelectors.mealList).innerHTML = '';
    },

    clearFormInput: function () {
      document.querySelector(UISelectors.date).value = '';
      document.querySelector(UISelectors.meal).value = '';
    },

    clearEditState: function () {
      // Change form Title
      document.querySelector(UISelectors.formTitle).innerText = 'Add Meal';
      // Change buttons state
      UICtrl.clearFormInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },

    // toggleClearBtn: function () {
    //   // Enable clear btn 
    //   if (document.querySelector(UISelectors.clearBtn).disabled) {
    //     document.querySelector(UISelectors.clearBtn).disabled = false;

    //     return true;
    //   } else {
    //     document.querySelector(UISelectors.clearBtn).disabled = true;

    //     return false;
    //   }
    // },

    showEditState: function () {
      // Change form Title
      document.querySelector(UISelectors.formTitle).innerText = 'Edit Meal';
      // Change buttons state
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline-block';
      document.querySelector(UISelectors.backBtn).style.display = 'inline-block';
    },

    addMealToForm: function () {
      document.querySelector(UISelectors.date).value = MealCtrl.getCurrentMeal().date;
      document.querySelector(UISelectors.meal).value = MealCtrl.getCurrentMeal().mealName;

      UICtrl.showEditState();
    },
  };
})();


// App Controller
const AppCtrl = (function (StorageCtrl, MealCtrl, UICtrl) {
  // Get UI selectors
  const UISelectors = UICtrl.getUISelectors();

  // Load Event listeners
  const loadEventListeners = function () {


    // Add Meal events
    document.querySelector(UISelectors.addBtn).addEventListener('click', mealAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });


    // Edit meal  events
    document.querySelector(UISelectors.mealList).addEventListener('click', editMeal);

    // Update meal info events
    document.querySelector(UISelectors.updateBtn).addEventListener('click', UpdateMealSubmit);

    // Delete meal info events
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteMealSubmit);

    // back btn events
    document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnSubmit);

    // Clear-all btn event
  //   document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllMealClick);
  };

  // Add contact on Submit
  const mealAddSubmit = function (e) {

    // validate Form
    if (UICtrl.validateForm() !== false) {
      // Clear Alert
      UICtrl.clearAlert(UISelectors.alert);

      // Add new Contact to data structure
      const input = UICtrl.getFormInputs();
      const newMeal = MealCtrl.addMeal(input);

      // Store in localStorage
      StorageCtrl.storeMeal(newMeal);

      // Get all meals
      const mealOptions = StorageCtrl.getMealOptionsFromLs();
      // show meal list header
      document.querySelector(UISelectors.displayTitle).style.display = 'block';

      // Populate meal List
      UICtrl.populateMealDisplay(mealOptions);
      UICtrl.updateMealCount();

      // Clear Input fields
      UICtrl.clearFormInput();

      // // Enable clear btn    
      // UICtrl.toggleClearBtn();

    } else {
      UICtrl.showAlert(alert, 'Please fill all fields!', 'alert alert-danger');
    }

    e.preventDefault();
  };


  // Edit meal on click
  const editMeal = function (e) {

    if (e.target.classList.contains('edit-meal')) {

      // // Disable clear-all
      // UICtrl.toggleClearBtn();

      // Get contact id
      const mealId = e.target.parentNode.id;

      // Break into an array
      const mealIdArr = mealId.split('-');

      // Get the actual id
      const id = parseInt(mealIdArr[1]);

      // Get meal
      const mealToEdit = MealCtrl.getMealById(id);
      console.log(mealToEdit)

      // Set current meal
      MealCtrl.setCurrentMeal(mealToEdit);

      // Add meal to form
      UICtrl.addMealToForm();
    }

    e.preventDefault();
  };


  // Update meal on submit
  const UpdateMealSubmit = function (e) {
    // validate Form
    if (UICtrl.validateForm()) { // Clear Alert
      UICtrl.clearAlert(UISelectors.alert);

      // Get meal input
      const meal = UICtrl.getFormInputs();

      console.log(MealCtrl.logData().currentMeal)
      console.log(meal, 'meals')

      // Update current meal
      const currentMeal = MealCtrl.getCurrentMeal()
      console.log(currentMeal, 'initial')

      currentMeal.date = meal.date;
      currentMeal.mealName = meal.meal;
      console.log(currentMeal, 'final')

      // Update Ls
      StorageCtrl.updateMealLs(currentMeal);
      

      // clear meal list
      UICtrl.clearMealList();

      // get meal option
      const mealOptions = MealCtrl.getData();
      console.log(mealOptions);

      // populate meal list
      UICtrl.populateMealDisplay(mealOptions);

      UICtrl.showAlert(UISelectors.alert, 'Meal updated!', 'alert alert-success');

      UICtrl.clearEditState();

      UICtrl.clearFormInput()

    } else {
      showAlert(UICtrl.alert, 'Please fill all fields!', 'alert alert-success');
    }

    UICtrl.clearAlert(UISelectors.alert);
    e.preventDefault();
  };

  // Delete meal on submit
  const deleteMealSubmit = function (e) {
    // Get current meal
    const currentMeal = MealCtrl.getCurrentMeal();

    //Delete from Ls
    StorageCtrl.deleteMealFromLs(currentMeal.id);

    // Delete from data structure
    MealCtrl.deleteMeal(currentMeal.id);

    UICtrl.updateMealCount();

    // Clear Edit State
    UICtrl.clearEditState();

    // get meal option
    const mealOptions = MealCtrl.getData();

    if(mealOptions.length === 0) {
      document.querySelector(UISelectors.displayContainer).style.display = 'none';
    }

    // populate meal list
    UICtrl.populateMealDisplay(mealOptions);

    UICtrl.showAlert(UISelectors.alert, 'Meal deleted!', 'alert alert-success');

    UICtrl.clearAlert(UISelectors.alert);


    e.preventDefault();
  };

  const backBtnSubmit = function (e) {

    UICtrl.clearEditState();

    UICtrl.clearFormInput();

    e.preventDefault();
  };

  const clearAllMealClick = function () {
    // Delete all meal options from data structure
    UICtrl.clearAllMealOptions();

    // Clear all contacts from UI
    UICtrl.clearMealList();

    // Clear all contacts from Ls
    StorageCtrl.clearAllMealsFromLs();

    // Update contacts counter
    UICtrl.updateMealCount();

    // Disable clear-all btn
    UICtrl.toggleClearBtn();

  };


  // Public methods
  return {

    init: function () {
      // Set Initial state
      UICtrl.clearEditState();

      // set current date
      document.querySelector(UISelectors.date).valueAsDate = new Date()

      let today = new Date().toISOString().substr(0, 10);
      document.querySelector(UISelectors.date).setAttribute('min', today);

      // Fetch meal options from data structure
      const mealOptions = MealCtrl.getData();

      // Populate UI with contacts
      UICtrl.populateMealDisplay(mealOptions);

      // // Enable clear-all button
      // document.querySelector(UISelectors.clearBtn).disabled = false;


      // Load EventListners
      loadEventListeners();

    }
  };

})(StorageCtrl, MealCtrl, UICtrl);



AppCtrl.init();
