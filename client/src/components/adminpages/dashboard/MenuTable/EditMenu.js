/* eslint jsx-a11y/label-has-for:0 */
/* eslint max-len:0 */
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const EditMenuTable = (props) => {
  const {
    title,
    content,
    editMenuMeals,
    hideModal,
    updateMenu
  } = props;

  const mealsNotInMenu = (() => {
    const mealsInMenu = new Set(content.meals.map(meal => meal.id));
    return props.meals.filter(meal => !mealsInMenu.has(meal.id));
  })();

  const menuDate = moment(new Date(content.postOn)).format('DD/MM/YYYY');
  const toggleMeal = (meal) => {
    const checkbox = document.getElementById(`${meal.id}-edit`);

    if (checkbox.checked === true) {
      props.addMealInEditMenu(meal.id);
    } else if (checkbox.checked === false) {
      props.deleteMealInEditMenu(meal.id);
    }
  };

  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>

      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          swal({
            text: 'Are you sure you want to update menu?',
            buttons: true,
            dangerMode: true,
          })
            .then((confirmed) => {
              if (confirmed) {
                const meals = [...editMenuMeals];
                // console.log(meals)
                updateMenu({ menuDate, meals });
                hideModal();
              }
            })
            .catch(err => err);
        }}
        className="editmenu-modal-form"
      >
        <div className="edit-menu-meals">
          <hr />
          <div className="checkbox-card">
            { mealsNotInMenu.map(meal => (
              <p key={meal.id} className="checkbox">
                <input
                  type="checkbox"
                  name="meal-check"
                  className="meal-check"
                  id={`${meal.id}-edit`}
                  onClick={() => {
                    toggleMeal(meal);
                  }}
                  value={meal.id}
                />
                {meal.title}
              </p>
            ))}
          </div>
        </div>

        <div className="menu-updatebtn">
          <button
            type="submit"
            name="updateMenuBtn"
            id="menu-btn"
            className="btn-2"
            disabled={editMenuMeals.length <= 0}
          >
            Update Menu
          </button>
        </div>
      </form>
    </div>
  );
};

EditMenuTable.propTypes = {
  title: PropTypes.string.isRequired,
  addMealInEditMenu: PropTypes.func.isRequired,
  deleteMealInEditMenu: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  hideModal: PropTypes.func.isRequired,
  editMenuMeals: PropTypes.array.isRequired,
  updateMenu: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired
};

export default EditMenuTable;
