/*   eslint class-methods-use-this:0, */
/* eslint no-alert: 0 */
/* eslint no-restricted-globals: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../../assets/css/meal-option.css';
import navData from '../../../helpers/navData';
import MealForm from './MealForm';
import MealTable from './MealTable/MealTable';
import adminActions from '../../../actions/admin';
import Footer from '../../common/Footer';

class MealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      mealOnEditId: ''
    };

    this.editMeal = this.editMeal.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.notify = this.notify.bind(this);
    this.fillForm = this.fillForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.getFormVal = this.getFormVal.bind(this);
    this.onAddMeal = this.onAddMeal.bind(this);
    this.onUpdateMeal = this.onUpdateMeal.bind(this);
    // this.onDeleteMeal = this.onDeleteMeal.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getMeals();
    this.closeEdit();
  }

  onUpdateMeal() {
    const { updateMeal } = this.props;
    const data = this.getFormVal();
    const mealId = this.state.mealOnEditId;
    const confirmed = confirm('Confirm Update!');

    if (confirmed) {
      updateMeal({ mealId, data });
      setTimeout(() => {
        this.notify(this.props.serverRes.message);
        location.reload();
      }, 200);
    }
    this.closeEdit();
  }

  // onDeleteMeal(mealId) {
  //   const { deleteMeal } = this.props;
  //   const confirmed = confirm('Are you sure you want to delete this meal?');
  //   if (confirmed) {
  //     deleteMeal(mealId);
  //     setTimeout(() => {
  //       this.notify(this.props.serverRes.message);
  //     }, 200);
  //   }
  //   if (this.props.serverRes.success) {
  //     setTimeout(() => {
  //       this.notify('Meal deleted successfully!');
  //     }, 200);
  //     this.closeEdit();
  //   } else {
  //     setTimeout(() => {
  //       this.notify(this.props.serverRes.message);
  //     }, 200);
  //   }
  // }

  onAddMeal() {
    const { postMeal } = this.props;
    const data = this.getFormVal();
    const confirmed = confirm('Confirm Add Meal!');
    if (confirmed) {
      postMeal(data);
      setTimeout(() => {
        this.notify(this.props.serverRes.message);
        location.reload();
      }, 200);
    }

    if (this.props.serverRes.success) {
      this.clearForm();
    }
  }

  /* eslint prefer-destructuring:0 */
  getFormVal() {
    const title = document.getElementById('meal-name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('dsc').value;
    let image = document.getElementById('image').value;

    if (!image && this.state.isEdit) {
      image = this.props.mealOnEdit.image;
    } else if (!image && !this.state.isEdit) {
      image = 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg';
    }

    const data = {
      title,
      price,
      description,
      image
    };
    return data;
  }

  editMeal(mealId) {
    this.setState({ isEdit: true });
    this.props.setMealForEdit(mealId);

    setTimeout(() => {
      this.fillForm();
    }, 200);

    // scroll to top
    document.body.scrollTop = '100px';
    document.documentElement.scrollTop = '100px';
  }

  closeEdit() {
    this.setState({ isEdit: false, mealOnEditId: '' });
    this.clearForm();
    this.props.removeMealFromEdit();
  }

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  fillForm() {
    const mealName = document.getElementById('meal-name');
    const price = document.getElementById('price');
    const dsc = document.getElementById('dsc');

    mealName.value = this.props.mealOnEdit.title;
    price.value = this.props.mealOnEdit.price;
    dsc.value = this.props.mealOnEdit.description;
    this.setState({ mealOnEditId: this.props.mealOnEdit.id });
  }

  clearForm() {
    const mealName = document.getElementById('meal-name');
    const price = document.getElementById('price');
    const dsc = document.getElementById('dsc');

    mealName.value = '';
    price.value = '';
    dsc.value = '';
    this.setState({ mealOnEditId: '' });
  }

  render() {
    const { isEdit, mealOnEditId } = this.state;
    return (
      <div className="main-container">
        <section className="form-section">
          <div className="meal-container">
            <MealForm
              {...this.props}
              isEdit={isEdit}
              closeEdit={this.closeEdit}
              addMeal={this.onAddMeal}
              updateMeal={this.onUpdateMeal}
              mealOnEditId={mealOnEditId}
              notify={this.notify}
            />
          </div>
        </section>
        <div className="container">
          <div className="table-title">Meal Options</div>
          <MealTable
            {...this.props}
            isEdit={isEdit}
            editMeal={this.editMeal}
            notify={this.notify}
          />
        </div>
        <ToastContainer
          {...this.props}
        />
        <Footer />
      </div>
    );
  }
}

MealPage.propTypes = {
  setNav: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  setMealForEdit: PropTypes.func.isRequired,
  removeMealFromEdit: PropTypes.func.isRequired,
  mealOnEdit: PropTypes.object.isRequired,
  postMeal: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  serverRes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  meals: state.admin.meals,
  mealOnEdit: state.admin.mealOnEdit,
  serverRes: state.admin.serverRes,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...adminActions
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MealPage);
