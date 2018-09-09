/* eslint no-nested-ternary: 0
max-len: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import sweetAlert from 'sweetalert';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

class CustomerOrderTableRow extends Component {
  constructor(props) {
    super(props);

    this.updateOrderPortion = this.updateOrderPortion.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.deleteOrderRow = this.deleteOrderRow.bind(this);
    this.showOrderDetails = this.showOrderDetails.bind(this);
    this.editOrders = this.editOrders.bind(this);
  }

  updateOrderPortion() {
    const { updatePortion, mealId } = this.props;
    const portion = document.getElementById(`portion-${mealId}`).value;
    updatePortion(mealId, portion);
  }

  cancelOrder(event) {
    event.preventDefault();
    sweetAlert({
      text: 'Are you sure you want to cancel this order? This action is irrevocable!',
      buttons: true,
      dangerMode: true,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.deleteOrder(this.props.item.orderId);
        }
      })
      .catch(err => err);
  }

  deleteOrderRow(event) {
    event.preventDefault();
    (this.props.orderedMealsLength <= 1)
      ?
      sweetAlert({
        text: 'You must have at least a meal!!',
        buttons: false,
        icon: 'warning',
        dangerMode: true,
      })
      :
      sweetAlert({
        text: 'Are you sure you want to remove this meal?',
        buttons: true,
        dangerMode: true,
      })
        .then((confirmed) => {
          if (confirmed) {
            this.props.deleteRow(this.props.mealId);
          }
        });
  }

  showOrderDetails(event) {
    event.preventDefault();
    this.props.showDetails(this.props.mealsUrl);
  }

  editOrders(event) {
    event.preventDefault();
    this.props.editOrder(this.props.mealsUrl);
  }

  render() {
    const {
      item,
      actions,
      isEdit,
      mealId,
      orderCreatedAt,
    } = this.props;

    return (
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
                  onChange={this.updateOrderPortion}
                  defaultValue = {item[key]}
                  required
                />
              </p>
            )
            :
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
                onClick={this.showOrderDetails}
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
                onClick={this.editOrders}
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
                onClick={this.cancelOrder}
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
              onClick={this.deleteOrderRow}
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

        <ReactTooltip className="mytooltip" />
      </div>
    );
  }
}

CustomerOrderTableRow.defaultProps = {
  deleteRow: undefined,
  mealId: undefined,
  isEdit: false,
  showDetails: undefined,
  mealsUrl: undefined,
  orderedMealsLength: 1,
  actions: undefined,
  editOrder: undefined,
  updatePortion: undefined,
  deleteOrder: undefined,
  orderCreatedAt: moment()
};

CustomerOrderTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  showDetails: PropTypes.func,
  mealsUrl: PropTypes.string,
  editOrder: PropTypes.any,
  deleteOrder: PropTypes.func,
  deleteRow: PropTypes.func,
  isEdit: PropTypes.bool,
  orderCreatedAt: PropTypes.any,
  actions: PropTypes.object,
  mealId: PropTypes.string,
  updatePortion: PropTypes.func,
  orderedMealsLength: PropTypes.number
};

export default CustomerOrderTableRow;
