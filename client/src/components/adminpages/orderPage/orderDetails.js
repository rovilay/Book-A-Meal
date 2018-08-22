import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import ReactPaginate from 'react-paginate';

import { orderDetailHead } from '../../../helpers/tableHeadData';
import AdminOrderTableRow from './OrderTablerow';

const OrderDetailsTable = (props) => {
  const {
    title,
    content,
    orderedMealsPagination,
    getOrderMeals
  } = props;

  const {
    id: orderId,
    User,
    Meals: orderMeals,
    deliveryAddress,
    createdAt: date
  } = content;

  const {
    limit,
    offset,
    numOfPages,
    count
  } = orderedMealsPagination;

  let totalCost = 0;

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  const handlePaginationClick = (data) => {
    const nextPage = data.selected;
    const newOffset = nextPage * limit;
    const mealsUrl = `/api/v1/orders/${orderId}/meals`;
    getOrderMeals(mealsUrl, { limit, offset: newOffset });
  };

  return (
    <div className="table-container">
      <div className="order-details">
        <h2 className="title">
          {title}
        </h2>
        <hr />
        <p>
          <span className="bold">Customer:</span> {`${User.firstName} ${User.lastName}`}
        </p>
        <p>
          <span className="bold">Date:</span> {moment(date).format('LL')}
        </p>
        <p>
          <span className="bold">Time:</span> {moment(date).format('LT')}
        </p>
        <p>
          <span className="bold">Address:</span> {deliveryAddress}
        </p>
      </div>

      <div className="container-test">
        <div className="row head">
          {
            orderDetailHead.map((head, i) => (
              <p
                key={i}
                className={classname('row-item', { 'meal-title': head === 'Meal' || head === 'orderId' })}
              >
                {head}
              </p>
            ))
          }
        </div>
        {
          orderMeals.map((meal, i) => {
            const {
              id,
              title: Meal,
              OrderMeal
            } = meal;
            const { portion, cost: UnitCost } = OrderMeal;
            const cost = UnitCost * portion;
            totalCost += cost;
            const item = {
              sn: ++i + offset,
              Meal,
              UnitCost,
              portion,
              cost
            };
            return (
              <AdminOrderTableRow
                key={i}
                item={item}
                id={id}
                {...props}
              />
            );
          })
        }
      </div>
      <div className="total-cost">
        <span className="bold">Total Cost: </span> &#8358;{totalCost}
      </div>
      {
        // show only if meals or orderMeals present
        (count > 5 || orderMeals.length < 1)
        &&
        <div className="modal-pagination">
          <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            breakLabel={<a href="">...</a>}
            breakClassName="break-me"
            pageCount={numOfPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePaginationClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      }
    </div>
  );
};

OrderDetailsTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  orderedMealsPagination: PropTypes.object.isRequired,
  getOrderMeals: PropTypes.func.isRequired
};

export default OrderDetailsTable;
