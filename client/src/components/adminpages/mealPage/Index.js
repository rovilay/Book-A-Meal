/*   eslint class-methods-use-this:0, */
/* eslint no-alert: 0 */
/* eslint no-restricted-globals: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

import navData from '../../../helpers/navData';
import MealForm from './MealForm';
import MealTable from './MealTable/MealTable';
// import adminActions from '../../../actions/adminActions';
import {
  setMealForEdit,
  postMeal,
  updateMeal,
  removeMealFromEdit,
  getMeals,
  deleteMeal
} from '../../../actions/mealActions';
import setFilter from '../../../actions/filterActions';
import imageUploader from '../../../helpers/imageUploader';
import notify from '../../../helpers/notify';
import filterify from '../../../helpers/filterify';
import FilterComp from '../../common/Filter';

class MealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      mealOnEditId: '',
      imageToUpload: '',
      uploadedImageLink: '',
      disableBtn: false
    };

    this.editMeal = this.editMeal.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.notify = this.notify.bind(this);
    this.fillForm = this.fillForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.getFormVal = this.getFormVal.bind(this);
    this.onAddMeal = this.onAddMeal.bind(this);
    this.onUpdateMeal = this.onUpdateMeal.bind(this);
    this.showUploadBar = this.showUploadBar.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getMeals();
    this.props.setFilter({ filter: 'all' });
    this.closeEdit();
  }

  /**
   * Updates Meal
   *
   * Calls the updateMeal action
   * And close edit state
   */
  onUpdateMeal() {
    const data = this.getFormVal();
    const mealId = this.state.mealOnEditId;
    swal({
      text: 'Confirm Meal Update!',
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.updateMeal({ mealId, data });
          this.closeEdit();
        }
      })
      .catch(err => notify(err));
  }

  /**
   * Posts Meal
   *
   * Calls the postMeal action
   * Clears form on success
   */
  onAddMeal() {
    const data = this.getFormVal();
    swal({
      text: 'Confirm action!',
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.postMeal(data)
            .then((success) => {
              if (success) {
                this.clearForm();
              }
            });
        }
      })
      .catch(err => notify(err));
  }

  /* eslint prefer-destructuring:0 */
  /**
   * Gets form values and sets image value with link from cloudinary,
   * If no image sets default image
   *
   * @returns {Object} data - Object consist of meal info
   */
  getFormVal() {
    const title = document.getElementById('meal-name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('dsc').value;
    let image = this.state.uploadedImageLink;

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

  /**
   * Shows upload progress bar if image is present
   */
  showUploadBar() {
    if (this.checkFileSize()) {
      const imageFile = document.getElementById('image').files[0];
      this.setState({ imageToUpload: imageFile.name });
    } else {
      this.setState({ imageToUpload: '' });
    }
  }


  /**
   * Uploads image to cloudinary
   */
  uploadImage() {
    this.showUploadBar();
    setTimeout(() => {
      if (this.state.imageToUpload) {
        const url = imageUploader('image');
        if (url) {
          url
            .then((res) => {
              if (typeof (res) === 'string') {
                return this.setState({
                  uploadedImageLink: res,
                  disableBtn: false
                }); // enable btn after upload
              }

              throw new Error(res.message);
            })
            .catch(err => err);
        }
      }
    }, 100);
  }

  /**
   * Sets meal for edit
   *
   * @param {string} mealId Id of meal to edit,
   * Calls setMealForEdit action
   *
   */
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

  /**
   * Closes edit state,
   * Calls clearForm function,
   * Dispatch removeMealFromEdit action
   */
  closeEdit() {
    this.setState({
      isEdit: false,
      mealOnEditId: '',
      imageToUpload: '',
      disableBtn: false,
      uploadedImageLink: ''
    });
    this.clearForm();
    this.props.removeMealFromEdit();
  }

  /**
   * Notifies message using toast module
   *
   * @param {*} msg message to notify
   */
  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  /**
   * Fills form on edit state with info of meal on Edit,
   * Sets mealOnEditId state
   */
  fillForm() {
    const mealName = document.getElementById('meal-name');
    const price = document.getElementById('price');
    const dsc = document.getElementById('dsc');

    mealName.value = this.props.mealOnEdit.title;
    price.value = this.props.mealOnEdit.price;
    dsc.value = this.props.mealOnEdit.description;
    this.setState({ mealOnEditId: this.props.mealOnEdit.id });
  }

  /**
   * Clears form
   */
  clearForm() {
    const mealName = document.getElementById('meal-name');
    const price = document.getElementById('price');
    const dsc = document.getElementById('dsc');
    const image = document.getElementById('image');

    mealName.value = '';
    price.value = '';
    dsc.value = '';
    image.value = '';
  }

  /**
   * Checks if file size exceeds 1.5mb
   * And disables button if file is proper size
   */
  checkFileSize() {
    const file = document.getElementById('image');
    if (file.files[0]) {
      if (file.files[0].size > 1500000) {
        this.notify('File must not exceed 1.5mb');
        file.value = '';
        return false;
      }
      this.setState({ disableBtn: true });
      return true;
    }

    return false; // if no file
  }

  render() {
    const {
      isEdit,
      mealOnEditId,
      imageToUpload,
      disableBtn
    } = this.state;

    return (
      <div>
        <section className="setMenu">
          <div className="setMenu-container">
            <MealForm
              {...this.props}
              isEdit={isEdit}
              closeEdit={this.closeEdit}
              addMeal={this.onAddMeal}
              updateMeal={this.onUpdateMeal}
              mealOnEditId={mealOnEditId}
              imageToUpload={imageToUpload}
              notify={this.notify}
              showUploadBar={this.showUploadBar}
              uploadImage={this.uploadImage}
              uploadedImageLink={this.state.uploadedImageLink}
              disableBtn={disableBtn}
            />
          </div>
        </section>
        <div className="table-container">
          <div className="table-title">Meal Options</div>
          <FilterComp
            {...this.props}
            tableContent="caterer_meals"
          />
          {
            (this.props.meals.length === 0)
              ?
                <p className="empty not-found">No meal found!</p>
              :
                <MealTable
                  {...this.props}
                  isEdit={isEdit}
                  editMeal={this.editMeal}
                  notify={this.notify}
                />
          }
        </div>
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
  setFilter: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  meals: filterify(state.meal.meals, state.filter),
  mealOnEdit: state.meal.mealOnEdit,
  mealError: state.meal.error
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setMealForEdit,
    postMeal,
    updateMeal,
    removeMealFromEdit,
    getMeals,
    deleteMeal,
    setFilter
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MealPage);
