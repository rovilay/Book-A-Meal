/* eslint jsx-a11y/label-has-for: 0 */
/* eslint no-restricted-globals: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';
import '../../../assets/css/meal-option.css';

const Mealform = ({
  mealOnEditId,
  closeEdit,
  updateMeal,
  addMeal,
  deleteMeal,
  imageToUpload,
  uploadedImageLink,
  uploadImage,
  isEdit,
  disableBtn
}) => (
  <div className="card">
    <div id="form-card" className="card-body">
      <div className="form-title" id="form-title">
        {
          (isEdit)
            ?
            'Edit Meal'
            :
            'Add Meal'
        }
        <hr />
      </div>

      <form
        id="meal-form"
        className="meal-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isEdit) {
            return updateMeal();
          }
          return addMeal(e);
        }}
      >

        <p className="price">
          <label htmlFor="name">Name
          </label>
          <input
            type="text"
            placeholder="Enter meal name"
            name="meal-name"
            id="meal-name"
            required
          />
        </p>

        <p className="price">
          <label htmlFor="price">Unit Price (&#8358;)
          </label>
          <input
            type="number"
            placeholder="Enter price"
            name="price"
            id="price"
            min="0"
            step="50"
            required
          />
        </p>

        <p className="dsc">
          <label htmlFor="dsc">Description
          </label>
          <input
            type="text"
            placeholder="Enter meal description"
            name="dsc"
            id="dsc"
            required
          />
        </p>

        <p>
          <label htmlFor="image">Image
          </label>
          <input
            type="file"
            placeholder="Enter img link"
            name="image"
            id="image"
            onChange={() => {
              uploadImage();
            }}
          />
        </p>
        {
          (imageToUpload)
          &&
          <div className="progress">
            <div id="progressBar" className="progressBar">0%</div>
          </div>
        }
        {
          (uploadedImageLink)
          &&
          <p>
            <img src={uploadedImageLink} alt="name" />
          </p>
        }
        {
          (!isEdit)
          &&
          (
            <p className="full">
              <button
                type="submit"
                name="addbtn"
                id="add-btn"
                className="add-btn btn-3"
                disabled={disableBtn}
              >
                <FontAwesome
                  name="plus"
                />
                ADD MEAL
              </button>
            </p>
          )
        }
        {
          (isEdit)
          &&
          (
            <p>
              <button
                type="submit"
                name="updatebtn"
                id="update-btn"
                className="update-btn btn-3"
                disabled={disableBtn}
              >
                <FontAwesome
                  name="arrow-circle-up"
                />
                  UPDATE MEAL
              </button>

              <button
                type="submit"
                name="deletebtn"
                id="delete-btn"
                className="delete-btn btn-3"
                onClick={(e) => {
                  e.preventDefault();
                  swal({
                    text: 'Are you sure you want to delete this meal?',
                    buttons: true,
                    dangerMode: true,
                  })
                    .then((confirmed) => {
                      if (confirmed) {
                        deleteMeal(mealOnEditId)
                          .then((errorRes) => {
                            if (!errorRes) {
                              closeEdit();
                            }
                          })
                          .catch(err => err);
                      }
                    })
                    .catch(err => err);
                }}
                disabled={disableBtn}
              >
                <FontAwesome
                  name="times"
                />
                DELETE MEAL
              </button>

              <button
                type="submit"
                name="backbtn"
                id="back-btn"
                className="back-btn btn-3"
                onClick={(e) => {
                  e.preventDefault();
                  closeEdit();
                }}
              >
                <FontAwesome
                  name="arrow-circle-left"
                />
                BACK
              </button>
            </p>
          )
        }
      </form>
    </div>
  </div>
);

Mealform.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  addMeal: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  deleteMeal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  mealOnEditId: PropTypes.string.isRequired,
  imageToUpload: PropTypes.string.isRequired,
  uploadedImageLink: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired
};

export default Mealform;
