/* eslint jsx-a11y/label-has-for:0 */
/* eslint max-len:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sweetAlert from 'sweetalert';

class EditMenuTable extends Component {
  constructor(props) {
    super(props);

    this.getMealsNotInMenu = this.getMealsNotInMenu.bind(this);
    this.toggleMealCheckbox = this.toggleMealCheckbox.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
  }

  /**
   * Checks meals for meals not currently in menu
   */
  getMealsNotInMenu() {
    const { content, meals } = this.props;
    const mealsInMenu = new Set(content.meals.map(meal => meal.id));
    return meals.filter(meal => !mealsInMenu.has(meal.id));
  }

  /**
   * check or unchecks meals
   * @param {*} meal meal to toggle
   */
  toggleMealCheckbox(meal) {
    return () => {
      const checkbox = document.getElementById(`${meal.id}-edit`);

      if (checkbox.checked === true) {
        this.props.addMealInEditMenu(meal.id);
      } else if (checkbox.checked === false) {
        this.props.deleteMealInEditMenu(meal.id);
      }
    };
  }

  /**
   * Updates menu
   * @param {*} event DOM event
   */
  /* istanbul ignore next */
  updateMenu(event) {
    event.preventDefault();
    const {
      hideModal,
      updateMenu,
      content,
      editMenuMeals
    } = this.props;
    const { menuId } = content;

    sweetAlert({
      text: 'Are you sure you want to update menu?',
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          const meals = [...editMenuMeals];
          updateMenu({ menuId, meals });
          hideModal();
        }
      })
      .catch(err => err);
  }

  render() {
    const {
      title,
      editMenuMeals,
    } = this.props;

    const mealsNotInMenu = this.getMealsNotInMenu();

    return (
      <div className="table-container">
        <h2 className="title">
          {title}
        </h2>

        <hr />
        <form
          onSubmit={this.updateMenu}
          className="editmenu-modal-form"
        >
          <div className="edit-menu-meals">
            <hr />
            {
              (mealsNotInMenu.length > 0)
                ?
                  <div className="checkbox-card">
                    {mealsNotInMenu.map(meal => (
                      <p key={meal.id} className="checkbox">
                        {meal.title}
                        <input
                          type="checkbox"
                          name="meal-check"
                          className="meal-check"
                          id={`${meal.id}-edit`}
                          onClick={this.toggleMealCheckbox(meal)}
                          value={meal.id}
                        />
                      </p>
                    ))}
                  </div>
                :
                  <div className="empty not-found">No meal to add!</div>
            }
          </div>

          {
            (mealsNotInMenu.length > 0)
            &&
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
          }
        </form>
      </div>
    );
  }
}

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
