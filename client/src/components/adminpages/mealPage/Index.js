/*   eslint class-methods-use-this:0, */
/* eslint no-alert: 0 */
/* eslint no-restricted-globals: 0 */
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import ReactPaginate from 'react-paginate';
import { Accordion } from 'react-accessible-accordion';

import navData from '../../../helpers/navData';
import MealForm from './MealForm';
import {
  setMealForEdit,
  postMeal,
  updateMeal,
  updateMealOnEdit,
  removeMealFromEdit,
  getMeals,
  deleteMeal
} from '../../../actions/mealActions';
import setFilter from '../../../actions/filterActions';
import imageUploader from '../../../helpers/imageUploader';
import notify from '../../../helpers/notify';
import filterify from '../../../helpers/filterify';
import toggleAccordion from '../../../helpers/toggleAccordion';
import FilterComp from '../../common/Filter';
import MealCard from '../../common/MealCard';

export class MealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      imageToUpload: '',
      uploadedImageLink: '',
      disableBtn: false,
    };

    this.editMeal = this.editMeal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.fillForm = this.fillForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.getFormValues = this.getFormValues.bind(this);
    this.onAddMeal = this.onAddMeal.bind(this);
    this.onUpdateMeal = this.onUpdateMeal.bind(this);
    this.showUploadBar = this.showUploadBar.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.props.setNav(navData.adminNav);
    this.props.getMeals({ limit: 12 });
    this.props.setFilter({ filter: 'all' });
  }

  componentWillUnmount() {
    this.setState({ isEdit: false });
    this.props.removeMealFromEdit();
  }

  /**
   * Updates Meal
   *
   * Calls the updateMeal action
   * And close edit state
   */
  onUpdateMeal(mealOnEditId) {
    const data = { ...this.props.mealOnEdit };
    sweetAlert({
      text: 'Confirm Meal Update!',
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.updateMeal({ mealId: mealOnEditId, data })
            .then((response) => {
              if (response && response.success) {
                this.closeEdit();
              }
            });
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
    const data = this.getFormValues();
    sweetAlert({
      text: 'Confirm action!',
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          this.props.postMeal(data)
            .then((success) => {
              if (success) {
                // close accordion
                toggleAccordion(
                  '.accordion__body',
                  'accordion__body  accordion__body--hidden',
                  'true'
                );
                this.closeEdit();
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
  getFormValues() {
    const title = document.getElementById('meal-name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('dsc').value;
    let image = this.state.uploadedImageLink;

    if (!image && this.state.isEdit) {
      image = this.props.mealOnEdit.image;
    } else if (!image && !this.state.isEdit) {
      /* eslint max-len:0, */
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
   * changes meal form value;
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.props.updateMealOnEdit({ [name]: value });
  }

  /**
   * Shows upload progress bar if image is present
   */
  /* istanbul ignore next */
  showUploadBar() {
    if (this.checkFileSize()) {
      const imageFile = document.getElementById('meal-image').files[0];
      this.setState({ imageToUpload: imageFile.name });
    } else {
      this.setState({ imageToUpload: '' });
    }
  }

  /**
   * Uploads image to cloudinary
   */
  /* istanbul ignore next */
  uploadImage() {
    this.showUploadBar();
    setTimeout(() => {
      if (this.state.imageToUpload) {
        const url = imageUploader('meal-image');
        if (url) {
          url
            .then((response) => {
              if (typeof (response) === 'string') {
                (this.state.isEdit)
                  && this.props.updateMealOnEdit({ image: response });
                return this.setState({
                  uploadedImageLink: response,
                  disableBtn: false
                }); // enable btn after upload
              }

              throw new Error(response.message);
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
    // const { meals } = this.props;
    this.setState({ isEdit: true });
    this.props.setMealForEdit(mealId);

    // scroll to top
    document.body.scrollTop = '100px';
    document.documentElement.scrollTop = '100px';

    // open accordion
    toggleAccordion('.accordion__body', 'accordion__body', 'false');
  }

  /**
   * Closes edit state,
   * Calls clearForm function,
   * Dispatch removeMealFromEdit action
   */
  closeEdit() {
    this.setState({
      isEdit: false,
      imageToUpload: '',
      disableBtn: false,
      uploadedImageLink: ''
    });

    this.props.removeMealFromEdit();


    // close accordion
    toggleAccordion(
      '.accordion__body',
      'accordion__body accordion__body--hidden',
      'true'
    );
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
  }

  /**
   * Clears form
   */
  clearForm() {
    const mealName = document.getElementById('meal-name');
    const price = document.getElementById('price');
    const dsc = document.getElementById('dsc');
    const image = document.getElementById('meal-image');

    mealName.value = '';
    price.value = '';
    dsc.value = '';
    image.value = '';
  }

  /**
   * Checks if file size exceeds 1.5mb
   * And disables button if file is proper size
   */
  /* istanbul ignore next */
  checkFileSize() {
    const file = document.getElementById('meal-image');
    if (file.files[0]) {
      if (file.files[0].size > 1500000) {
        notify('File must not exceed 1.5mb', 'toast-danger');
        file.value = '';
        return false;
      }
      this.setState({ disableBtn: true });
      return true;
    }

    return false; // if no file
  }

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const { limit } = this.props.pagination;
    const nextOffset = (data.selected) * limit;

    this.props.getMeals({ limit, offset: nextOffset });
  }

  render() {
    const {
      isEdit,
      imageToUpload,
      disableBtn,
    } = this.state;

    const { numOfPages, count } = this.props.pagination;

    return (
      <div className="meal-page">
        <div className="welcome merienda">
          <p className="merienda">
            Manage Meals
          </p>
        </div>
        <section className="setMeal">
          <Accordion>
            <div className="setMeal-container">
              <MealForm
                {...this.props}
                isEdit={isEdit}
                closeEdit={this.closeEdit}
                addMeal={this.onAddMeal}
                updateMeal={this.onUpdateMeal}
                imageToUpload={imageToUpload}
                handleChange={this.handleChange}
                notify={this.notify}
                showUploadBar={this.showUploadBar}
                uploadImage={this.uploadImage}
                uploadedImageLink={this.state.uploadedImageLink}
                disableBtn={disableBtn}
              />
            </div>
          </Accordion>
        </section>
        <div className="">
          {
            (this.props.meals.length !== 0)
            &&
            <div className="title">Meals</div>
          }
          {
            (this.props.meals.length !== 0)
            &&
            <FilterComp
              {...this.props}
              tableContent="caterer_meals"
            />
          }
          {
            (this.props.meals.length === 0)
              ?
                <p className="empty not-found">No meal found!</p>
              :

                <div className="menu-container">
                  {
                    this.props.meals.map(meal => (
                      <MealCard
                        key={meal.id}
                        mealData={meal}
                        {...this.props}
                        editMeal={this.editMeal}
                      />
                    ))
                  }
                </div>
          }

          {
            (count > 12)
            &&
            <div className="pagination-container">
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
  meals: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  updateMealOnEdit: PropTypes.func.isRequired
};

export const mapStateToProps = state => (
  {
    meals: filterify(state.meal.meals, state.filter),
    mealOnEdit: state.meal.mealOnEdit,
    pagination: state.meal.pagination,
    mealError: state.meal.error
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setMealForEdit,
    postMeal,
    updateMeal,
    removeMealFromEdit,
    getMeals,
    deleteMeal,
    updateMealOnEdit,
    setFilter
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MealPage);
