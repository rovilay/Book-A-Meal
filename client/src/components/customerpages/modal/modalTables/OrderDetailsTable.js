import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import classname from 'classnames';

import { orderDetailHead } from '../../../../helpers/tableHeadData';
import CustomerOrderTableRow from '../../orderPage/CustomerOrderTablerow';

class OrderDetailsTable extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const { id: orderId } = this.props.content;
    const { limit } = this.props.orderedMealsPagination;
    const nextPage = data.selected;
    const newOffset = nextPage * limit;
    const mealsUrl = `/api/v1/orders/${orderId}/meals`;
    this.props.getOrderMeals(mealsUrl, { limit, offset: newOffset });
  }

  render() {
    const {
      title,
      content,
      orderedMealsPagination,
    } = this.props;

    const {
      Meals: orderMeals,
      deliveryAddress,
      createdAt,
    } = content;

    const {
      offset,
      numOfPages,
      count
    } = orderedMealsPagination;

    return (
      <div className="modal-container">
        <div className="order-details">
          <h2 className="title">
            {title}
          </h2>
          <hr />
          <p>
            <span className="bold">Date:</span> {moment(createdAt).format('LL')}
          </p>
          <p>
            <span className="bold">Time:</span> {moment(createdAt).format('HH:mm')}
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
              const { portion, cost: unitCost } = OrderMeal;
              const cost = unitCost * portion;
              const item = {
                sn: ++i + offset,
                Meal,
                unitCost,
                portion,
                cost
              };

              return (
                <CustomerOrderTableRow
                  key={i}
                  item={item}
                  id={id}
                  {...this.props}
                />
              );
            })
          }
        </div>
        {
          // show only if meals or orderMeals present
          (count > 5)
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
              onPageChange={this.handlePaginationClick}
              containerClassName="pagination"
              subContainerClassName="pages pagination"
              activeClassName="active"
            />
          </div>
        }
      </div>
    );
  }
}

OrderDetailsTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  getOrderMeals: PropTypes.func.isRequired,
  orderedMealsPagination: PropTypes.object.isRequired
};

export default OrderDetailsTable;
