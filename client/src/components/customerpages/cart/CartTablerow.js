/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import sweetAlert from 'sweetalert';

class CartTableRow extends Component {
  constructor(props) {
    super(props);

    this.removeMeal = this.removeMeal.bind(this);
  }

  /**
   * Shows confirmation before deleting row
   * @memberof CartTableRow
   */
  /* istanbul ignore next */
  removeMeal(event) {
    event.preventDefault();
    sweetAlert({
      text: 'Are you sure you want to remove this meal?',
      buttons: true,
      dangerMode: true,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.deleteRow(this.props.item);
        }
      })
      .catch(err => err);
  }

  render() {
    const {
      item,
      updatePortion,
      showId,
      sn,
      actions
    } = this.props;

    return (
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
                    onChange={updatePortion(item)}
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
                  onClick={this.removeMeal}
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
  }
}

CartTableRow.defaultProps = {
  showId: false,
  sn: undefined
};

CartTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  deleteRow: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  updatePortion: PropTypes.func.isRequired,
  showId: PropTypes.bool,
  sn: PropTypes.number
};

export default CartTableRow;
