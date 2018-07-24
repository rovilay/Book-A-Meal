/* eslint jsx-a11y/label-has-for:0 */
/* eslint max-len:0 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import ModalTableRow from '../../../common/Table/ModalTableRow';

const EditMenuTable = (props) => {
  const {
    title,
    content,
    submitUpdate,
    editMenuMeals,
    serverRes,
    hideModal
  } = props;
  const sortedMeals = props.meals.sort((a, b) => a.title > b.title);
  const temp = [];
  const menuDate = moment(new Date(content.postOn)).format('DD/MM/YYYY');
  const editMenuMeal = (mealId) => {
    const checkbox = document.getElementById(`${mealId}-edit`);

    if (checkbox.checked === true) {
      props.addMealInEditMenu(mealId);
    } else if (checkbox.checked === false) {
      props.deleteMealInEditMenu(mealId);
    }
  };
  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>

      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        const meals = [...new Set(editMenuMeals.concat(temp))]; // merge new meals with old meals,returns only unique values
        submitUpdate(menuDate, meals);
        setTimeout(() => {
        }, 3000);
        if (serverRes.message === 'Menus updated successfully') {
          hideModal();
        }
      }}
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
            { sortedMeals.map(meal => (
              <p key={meal.id}>
                <input
                  type="checkbox"
                  name="meal-check"
                  className="meal-check"
                  id={`${meal.id}-edit`}
                  onClick={() => {
                    editMenuMeal(meal.id);
                  }}
                  value={meal.id}
                />
                {meal.title}
              </p>
            ))}
          </div>
        </div>
        <table>
          <TableHead tableHead={tableHead.editMenuHead} />
          <tbody className="modal-table-body">
            {
              content.meals.map((meal, i) => {
                const {
                  id,
                  title: Meal,
                  price: unitPrice,
                  description
                } = meal;
                temp.push(id);
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
            disabled={temp.length <= 0}
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
  serverRes: PropTypes.object.isRequired,
  submitUpdate: PropTypes.func.isRequired,
  addMealInEditMenu: PropTypes.func.isRequired,
  deleteMealInEditMenu: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
  hideModal: PropTypes.func.isRequired,
  editMenuMeals: PropTypes.array.isRequired
};

export default EditMenuTable;
