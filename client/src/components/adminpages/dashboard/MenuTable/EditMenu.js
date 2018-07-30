/* eslint jsx-a11y/label-has-for:0 */
/* eslint max-len:0 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import swal from 'sweetalert';

import tableHeadData from '../../../../helpers/tableHeadData';
import TableHead from '../../../common/Table/TableHead';
import ModalTableRow from '../../../common/Table/ModalTableRow';

const EditMenuTable = (props) => {
  const {
    title,
    content,
    submitUpdate,
    editMenuMeals,
    hideModal
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
      props.addMealInEditMenuModal(meal);
    } else if (checkbox.checked === false) {
      props.deleteMealInEditMenu(meal.id);
      props.deleteMealInEditModal(meal.id);
    }
  };
  return (
    <div className="table-container">
      <h2 className="title">
        {title} {menuDate}
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
                submitUpdate(menuDate, meals);
                hideModal();
              }
            })
            .catch(err => err);
        }}
        className="editmenu-modal-form"
      >
        <p className="big-little">
          Post On: {content.postOn}
        </p>
        <div className="edit-menu-meals">
          <h3 className="title-2">
            Add Meals
          </h3>
          <hr />
          <div className="checkbox-card">
            { mealsNotInMenu.map(meal => (
              <p key={meal.id}>
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
        <table>
          <TableHead tableHeadData={tableHeadData.editMenuHead} />
          <tbody className="modal-table-body">
            {
              content.meals.map((meal, i) => {
                const {
                  id,
                  title: Meal,
                  price: unitPrice,
                  description
                } = meal;
                const item = {
                  sn: ++i,
                  Meal,
                  unitPrice,
                  description
                };

                return (
                  <ModalTableRow
                    key={id}
                    item={item}
                    id={id}
                    {...props}
                  />
                );
              })
            }
          </tbody>
        </table>

        <div className="menu-updatebtn">
          <button
            type="submit"
            name="updateMenuBtn"
            id="menu-btn"
            className="update-btn btn-1"
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
  content: PropTypes.object.isRequired,
  submitUpdate: PropTypes.func.isRequired,
  addMealInEditMenu: PropTypes.func.isRequired,
  deleteMealInEditMenu: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  hideModal: PropTypes.func.isRequired,
  editMenuMeals: PropTypes.array.isRequired,
  addMealInEditMenuModal: PropTypes.func.isRequired,
  deleteMealInEditModal: PropTypes.func.isRequired
};

export default EditMenuTable;
