/* eslint no-nested-ternary: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classname from 'classnames';
import swal from 'sweetalert';
import moment from 'moment';

const TableRow = ({
  item,
  deleteOrder,
  deleteRow,
  mealsUrl,
  actions,
  editOrder,
  isEdit,
  mealId,
  updatePortion,
  orderedMealsLength,
  orderCreatedAt,
  showDetails
}) => (
  <div className="row">
    {
      Object.keys(item).map((key, i) => (
        (key === 'portion' && isEdit)
          ?
          (
            <p key={i} className="row-item input-div">
              <input
                type="number"
                min="1"
                id={`portion-${mealId}`}
                className="portion"
                name="portion"
                onChange={() => {
                  const portion = document.getElementById(`portion-${mealId}`).value;
                  updatePortion(mealId, portion);
                }}
                defaultValue = {item[key]}
                required
              />
            </p>
          )
          :
          (
            (
              <p
                key={i}
                className={classname('row-item', { 'meal-title': key === 'Meal' || key === 'orderId' })}
              >
                {item[key]}
              </p>
            )
          )
      ))
    }

    {
      (actions)
      &&
      (
      <p
        className="row-item actions"
      >

        {
          (actions.info)
          &&
          (
            <button
              className="btn-3 box-shadow"
              onClick={() => {
                showDetails(mealsUrl);
              }}
            >
              <FontAwesome
                name="info-circle"
                size="2x"
                className="trash info-circle"
              />
            </button>
          )
        }
        {
          // show only if order can still be edited
          (actions.edit && (moment(orderCreatedAt).add(15, 'm') > moment()))
          &&
          (
            <button
              className="btn-3 box-shadow"
              onClick={() => {
                editOrder(mealsUrl);
              }}
            >
              <FontAwesome
                name="pencil"
                size="2x"
                className="pencil"
              />
            </button>
          )
        }
        {
          (actions.delete && !isEdit && (moment(orderCreatedAt).add(15, 'm') > moment()))
          &&
          (
            <button
              className="btn-3 box-shadow"
              onClick={(e) => {
                e.preventDefault();
                swal({
                  text: 'Are you sure you want to remove this meal?',
                  buttons: true,
                  dangerMode: true,
                })
                  .then((confirmed) => {
                    if (confirmed) {
                      deleteOrder(item.orderId);
                    }
                  })
                  .catch(err => err);
              }}
            >
              <FontAwesome
                name="trash"
                size="2x"
                className="trash"
              />
            </button>
          )
        }
        {
          (actions.delete && isEdit)
          &&
          (
          <button
            className="btn-3 box-shadow"
            onClick={(e) => {
              e.preventDefault();
              (orderedMealsLength <= 1)
                ?
                swal({
                  text: 'You must have at least a meal!!',
                  buttons: false,
                  icon: 'warning',
                  dangerMode: true,
                })
                :
                deleteRow(mealId);
            }}
          >
            <FontAwesome
              name="trash"
              size="2x"
              className="trash"
            />
          </button>
          )
        }
      </p>
      )
    }
  </div>
);

TableRow.defaultProps = {
  deleteRow: undefined,
  mealId: undefined,
  isEdit: false,
  showDetails: undefined,
  mealsUrl: undefined,
  orderedMealsLength: 1,
  actions: undefined,
  orderCreatedAt: moment()
  // mealImage: undefined,
  // showId: false,
  // sn: undefined
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  showDetails: PropTypes.func,
  mealsUrl: PropTypes.string,
  editOrder: PropTypes.any.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  deleteRow: PropTypes.func,
  isEdit: PropTypes.bool,
  orderCreatedAt: PropTypes.any,
  actions: PropTypes.object,
  mealId: PropTypes.string,
  updatePortion: PropTypes.func.isRequired,
  orderedMealsLength: PropTypes.number
  // showId: PropTypes.bool,
  // sn: PropTypes.number
};

export default TableRow;
