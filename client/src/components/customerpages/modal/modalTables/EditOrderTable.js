/* eslint jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import classname from 'classnames';

import { editOrderTableHead } from '../../../../helpers/tableHeadData';
import CustomerOrderTableRow from '../../orderPage/CustomerOrderTablerow';

class EditOrderTable extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  /**
   * handles pagination changes
   *
   * @memberof EditOrderTable
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const {
      limit,
    } = this.props.orderedMealsPagination;

    const {
      UserId,
      orderId
    } = this.props.editOrder;

    const nextPage = data.selected;
    const newOffset = nextPage * limit;
    const mealsUrl = `/api/v1/orders/${UserId}?${orderId}`;
    this.props.getOrderMeals(mealsUrl, { limit, offset: newOffset });
  }

  /**
   * Submits the edited order
   * @param  {any} event DOM event
   * @return {void}
   * @memberof EditOrderTable
   */
  submitEdit(event) {
    event.preventDefault();
    const {
      updateOrder,
      editOrder
    } = this.props;

    const deliveryAddress = document.getElementById('delivery-address').value.trim();
    const data = { deliveryAddress, meals: editOrder.orderedMeals };
    updateOrder(editOrder.orderId, data);
  }

  render() {
    const {
      title: modalTitle,
      editOrder,
      orderedMealsPagination
    } = this.props;

    const {
      orderedMeals,
      totalPrice,
    } = editOrder;

    const {
      offset,
      numOfPages,
      count
    } = orderedMealsPagination;

    return (
      <div className="modal-container">
        <h2 className="title">
          {modalTitle}
        </h2>

        <hr />

        <form
          onSubmit={this.submitEdit}
          className="edit-order"
        >
          <div className="address">
            <label htmlFor="address">
              Address:
            </label>
            <div className="input-div">
              <input
                type="text"
                placeholder="Enter delivery address"
                name="deliveryAddress"
                id="delivery-address"
                defaultValue={editOrder.deliveryAddress}
                required
              />
            </div>
          </div>

          <div className="container-test">
            <div className="row head">
              {
                editOrderTableHead.map((head, i) => (
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
              orderedMeals.map((meal, i) => {
                const {
                  id,
                  title: Meal,
                  cost,
                  portion,
                  price
                } = meal;
                const item = {
                  sn: ++i + offset,
                  Meal,
                  cost,
                  portion,
                  price
                };

                return (
                  <CustomerOrderTableRow
                    key={id}
                    item={item}
                    mealId={id}
                    {...this.props}
                    orderedMealsLength={orderedMeals.length}
                    actions={{
                      edit: false,
                      info: false,
                      delete: true
                    }}
                  />
                );
              })
            }
          </div>
          <div className="order">
            <p id="order-total-price" className="orderTot">
              Total Price: &#8358;{totalPrice}
            </p>
            <button
              type="submit"
              name="orderbtn"
              id="order-btn"
              className="btn-2"
              disabled={orderedMeals.length <= 0}
            >
              Update order
            </button>
          </div>
        </form>
        {
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

EditOrderTable.propTypes = {
  title: PropTypes.string.isRequired,
  editOrder: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
  getOrderMeals: PropTypes.func.isRequired,
  orderedMealsPagination: PropTypes.object.isRequired
};

export default EditOrderTable;
