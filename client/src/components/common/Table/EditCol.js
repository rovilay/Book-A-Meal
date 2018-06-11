import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { updateMealPortion } from '../../../actions/orders';

class EditTableCol extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     portion: this.props.val
  //   };

  //   // this.updatePortion = this.updatePortion.bind(this);
  //   // this.changePortion = this.changePortion.bind(this);
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.portion !== nextState.portion) {
  //     return true;
  //   }

  //   return false;
  // }
  // componentWillUpdate() {
  //   this.updatePortion();
  // //   const { dispatch, mealId } = this.props;
  // //   const { portion } = this.state;
  // //   console.log(portion);
  // //   dispatch(updateMealPortion({ mealId, portion }));
  // }

  // changePortion(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  //   // this.updatePortion();
  //   // const { dispatch, mealId } = this.props;
  //   // const { portion } = this.state;
  //   // console.log(this.state.portion);
  //   // dispatch(updateMealPortion({ mealId, portion }));
  // }

  // updatePortion(e) {
  //   const { dispatch, mealId } = this.props;
  //   const { portion } = this.state;
  //   this.setState({ [e.target.name]: e.target.value });
  //   // this.forceUpdate();
  //   // console.log(this.state.portion);
  //   dispatch(updateMealPortion({ mealId, portion }));
  // }

  render() {
    const {
      isEdit,
      val,
      dataTitle,
      updatePortion,
      changePortion
    } = this.props;

    return (
      <td data-title={dataTitle}>

        {
          (isEdit && dataTitle === 'portion')
          ?
          (
            <input
              type="number"
              min="1"
              id="portion"
              className="portion"
              name="portion"
              // defaultValue={portion}
              defaultValue={val}
              onChange={changePortion}
              onBlur={updatePortion}
              required
            />
          )
          :
          (val)
        }
      </td>
    );
  }
}

EditTableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  isEdit: PropTypes.bool.isRequired,
  // mealId: PropTypes.any.isRequired,
  // dispatch: PropTypes.func.isRequired,
  updatePortion: PropTypes.func.isRequired,
  changePortion: PropTypes.func.isRequired
};

export default EditTableCol;
