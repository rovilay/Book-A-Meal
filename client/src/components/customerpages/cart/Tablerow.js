/* eslint no-nested-ternary: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
// import classname from 'classnames';
import swal from 'sweetalert';

const TableRow = ({
  item,
  deleteRow,
  actions,
  mealImage,
  updateCartMealPortion,
  showId,
  sn
}) => (
  <div className="row">
    {
      Object.keys(item).map((key, i) => (
        (key === 'portion')
          ?
          (
            <p key={i} className="row-item input-div">
              <input
                type="number"
                min="1"
                id={`portion-${item.id}`}
                className="portion"
                name="portion"
                onChange={() => {
                  const portion = document.getElementById(`portion-${item.id}`).value;
                  updateCartMealPortion({ ...item, portion });
                }}
                defaultValue = {item[key]}
                required
              />
            </p>
          )
          :
          (
            // check if id
            (key === 'id' && !showId)
              ?
                <p
                  key={i}
                  className="row-item"
                >
                  {sn}
                </p>
              :
              (
                <p
                  key={i}
                  className="row-item"
                >
                  {item[key]}

                  {
                    (key === 'meal') // if meal add tooltip
                    &&
                    (
                      <span key={i} className="tooltip">
                        <img src={mealImage} alt={item.key} />
                      </span>
                    )
                  }
                </p>
              )
          )
      ))
    }
    {/* Actions  */}
    {
      (actions)
      &&
      (
      <p
        className="row-item actions"
      >

        {
          (actions.delete)
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
                      deleteRow(item);
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
      </p>
      )
    }
  </div>
);

TableRow.defaultProps = {
  deleteRow: undefined,
  mealImage: undefined,
  updateCartMealPortion: undefined,
  showId: false,
  sn: undefined
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  deleteRow: PropTypes.func,
  actions: PropTypes.object.isRequired,
  updateCartMealPortion: PropTypes.func,
  mealImage: PropTypes.string,
  showId: PropTypes.bool,
  sn: PropTypes.number
};

export default TableRow;
