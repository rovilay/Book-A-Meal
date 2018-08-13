import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

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
    userId,
    User,
    Meals: orderMeals,
    deliveryAddress,
    totalPrice,
    createdAt: date
  } = content;

  const {
    limit,
    offset,
    numOfPages,
    count
  } = orderedMealsPagination;

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  const handlePaginationClick = (data) => {
    const nextPage = data.selected;
    const newOffset = nextPage * limit;
    const mealsUrl = `/api/v1/orders/${userId}?${orderId}`;
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
        <p>
          <span className="bold">Total Price:</span> &#8358;{totalPrice}
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
              price: unitPrice,
              OrderMeal
            } = meal;
            const { portion } = OrderMeal;
            const price = unitPrice * portion;
            const item = {
              sn: ++i + offset,
              Meal,
              unitPrice,
              portion,
              price
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
