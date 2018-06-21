/* eslint jsx-a11y/label-has-for: 0 */
/* eslint no-alert: 0 */
/* eslint no-restricted-globals: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const Mealform = props => (
  <div className="card">
    <div id="form-card" className="card-body">
      <div className="form-title" id="form-title">
        {
          (props.isEdit)
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
          if (props.isEdit) {
           return props.updateMeal();
          }
          return props.addMeal();
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
            onChange={(e) => {
              e.preventDefault();
              if (props.checkFileSize()) {
                props.showUploadBar();
              }
            }}
          />
        </p>
        {
          (props.imageToUpload)
          &&
          <div className="progress">
            <div id="progressBar" className="progressBar">0%</div>
          </div>
        }
        {
          (!props.isEdit)
          &&
          (
            <p className="full">
              <button
                type="submit"
                name="addbtn"
                id="add-btn"
                className="add-btn btn-3"
                disabled={props.disableBtn}
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
          (props.isEdit)
          &&
          (
            <p>
              <button
                type="submit"
                name="updatebtn"
                id="update-btn"
                className="update-btn btn-3"
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
                  const confirmed = confirm('Are you sure you want to delete this meal?');
                  if (confirmed) {
                    props.deleteMeal(props.mealOnEditId);
                    setTimeout(() => {
                      if (!props.serverRes.success && !props.serverRes.message) {
                        props.notify('Meal was DELETED successfully');
                        props.closeEdit();
                        location.reload();
                      }
                      if (props.serverRes.success === false) {
                        props.notify(props.serverRes.message);
                      }
                    }, 200);
                  }
                }}
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
                  props.closeEdit();
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
  serverRes: PropTypes.object.isRequired,
  mealOnEditId: PropTypes.string.isRequired,
  notify: PropTypes.func.isRequired,
  checkFileSize: PropTypes.func.isRequired,
  imageToUpload: PropTypes.string.isRequired,
  showUploadBar: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired
};

export default Mealform;
