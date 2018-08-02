/* eslint no-nested-ternary: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classname from 'classnames';

const TableRow = ({
  item,
  mealsUrl,
  actions,
  showDetails
}) => (
  <div className="row">
    {
      Object.keys(item).map((key, i) => (
        <p
          key={i}
          className={classname('row-item', { 'meal-title': key === 'Meal' || key === 'orderId' })}
        >
          {item[key]}
        </p>
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
      </p>
      )
    }
  </div>
);

TableRow.defaultProps = {
  showDetails: undefined,
  mealsUrl: undefined,
  actions: undefined,
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  showDetails: PropTypes.func,
  mealsUrl: PropTypes.string,
  actions: PropTypes.object
};

export default TableRow;
