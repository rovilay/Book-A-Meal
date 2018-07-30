/* eslint no-alert: 0 */
/* eslint no-restricted-globals: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';

import TableCol from '../../../common/Table/TableCol';

const MealTableRow = (props) => {
  const {
    item,
    editMeal,
    isEdit,
    deleteMeal
  } = props;
  const Meal = {
    sn: item.sn,
    meal: item.Meal,
    unitPrice: item.unitPrice,
    description: item.description,
    createdAt: item.createdAt,
  };

  return (
    <tr key={item.mealId}>
      {
        Object.keys(Meal).map((key, i) => (
          (<TableCol dataTitle={key} val={Meal[key]} key={i} mealImage={item.image} />)
        ))
      }

      {
        <td data-title="view details">
          <a
            role="button"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              editMeal(item.mealId);
            }}
            className="btn-col btn-2 meal-btn"
          >
            <FontAwesome
              name="edit"
              size="2x"
            />
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              swal({
                text: 'Are you sure you want to delete this meal?',
                buttons: true,
                dangerMode: true,
              })
                .then((confirmed) => {
                  if (confirmed) {
                    deleteMeal(item.mealId);
                  }
                })
                .catch(err => err);
            }}
            href="#"
            role="button"
            className="btn-col btn-2 meal-btn"
            disabled={isEdit}
          >
            <FontAwesome
              name="trash"
              size="2x"
            />
          </a>
        </td>
      }
    </tr>
  );
};

MealTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  editMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default MealTableRow;
