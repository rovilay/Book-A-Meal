import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditTableCol from './EditCol';
// import { deleteMealInEditOrder, updateMealPortion } from '../../../actions/orders';
// import { updateMealPortion } from '../../../actions/orders';


class ModalTableRow extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     portion: this.props.item.portion,
  //     // price: 0,
  //     // unitPrice: this.props.item.unitPrice
  //   };

  //   this.deleteRow = this.deleteRow.bind(this);
  //   this.updatePortion = this.updatePortion.bind(this);
  //   this.changePortion = this.changePortion.bind(this);
  //   // this.calcPrice = this.calcPrice.bind(this);
  //   // this.cc = this.cc.bind(this);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.portion !== nextState.portion;
  // }

  // deleteRow() {
  //   const { deleteMealInEditOrder, id } = this.props;
  //   // const id = sn - 1;
  //   // const ale = alert('Are you sure you want to delete this meal?')
  //   deleteMealInEditOrder(id);

  //   console.log('meal deleted');
  // }

  // componentDidUpdate() {
  //   const { dispatch, id: mealId } = this.props;
  //   const { portion } = this.state;
  //   dispatch(updateMealPortion({ mealId, portion }));
  // }
  // calcPrice() {
  //   const { unitPrice } = this.props.item;
  //   const price = this.state.portion * unitPrice;
  //   this.setState({ price });

  // }

  // cc() {
  //   this.calcPrice();
  // }

  // changePortion(e) {
  //   const portion = e.target.value;
  //   this.setState({
  //     portion,
  //   });
  // }

  // updatePortion() {
  //   // this.changePortion();
  //   const { updateMealPortion, id: mealId } = this.props;
  //   const { portion } = this.state;
  //   updateMealPortion({ mealId, portion });
  // }

  render() {
    const {
      item,
      isEdit,
      id,
      deleteRow
    } = this.props;

    return (
      <tr key={id}>
        {
          Object.keys(item).map((key, i) => (
            (
              <EditTableCol
                dataTitle={key}
                val={item[key]}
                key={i}
                isEdit={isEdit}
                mealId={id}
                {...this.props}
              />
            )
          ))
        }
        {
          (isEdit)
          &&
          <td data-title="delete">
            <button
              className="btn-col btn-1"
              onClick={() => {
                deleteRow(id);
              }}
            >
              delete
            </button>
          </td>
        }
      </tr>
    );
  }
}

ModalTableRow.defaultProps = {
  isEdit: false,
};

ModalTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  id: PropTypes.any.isRequired,
  deleteRow: PropTypes.func.isRequired,
};

export default ModalTableRow;
