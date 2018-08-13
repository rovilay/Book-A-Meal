/* eslint no-nested-ternary: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';

const OrderTableRow = ({
  item,
  mealsUrl,
  actions,
  showDetails
}) => (
  <div className="row">
    {
      Object.keys(item).map((key, i) => (
        (
          (key === 'orderId' || key === 'Meal')
            ?
            (
              <p
                key={i}
                className="row-item meal-title"
                data-tip={item[key]}
              >
                {item[key]}
              </p>
            )
            :
            (
              <p
                key={i}
                className="row-item"
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
      </p>
      )
    }

    <ReactTooltip className="mytooltip" />
  </div>
);

OrderTableRow.defaultProps = {
  showDetails: undefined,
  mealsUrl: undefined,
  actions: undefined,
};

OrderTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  showDetails: PropTypes.func,
  mealsUrl: PropTypes.string,
  actions: PropTypes.object
};

export default OrderTableRow;
