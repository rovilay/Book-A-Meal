/* eslint jsx-a11y/label-has-for: 0 */
/* eslint no-restricted-globals: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';


const Mealform = ({
  closeEdit,
  updateMeal,
  addMeal,
  imageToUpload,
  uploadedImageLink,
  uploadImage,
  mealOnEdit,
  isEdit,
  disableBtn
}) => (
  <AccordionItem>
    <AccordionItemTitle>
      <h3 className="form-title" id="form-title">
        {
          (isEdit)
            ?
            'Edit Meal'
            :
            'Add Meal'
        }
      </h3>
      <FontAwesome
        name="chevron-down"
      />
    </AccordionItemTitle>

    <AccordionItemBody>
      <div className="card">
        <div id="form-card" className="card-body">
          <form
            id="meal-form"
            className="meal-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (isEdit) {
                return updateMeal(mealOnEdit.id);
              }
              return addMeal(e);
            }}
          >
            <div className="name">
              <label htmlFor="name">
                Name
              </label>
              <p className="input-div">
                <input
                  type="text"
                  placeholder="Enter meal name"
                  name="meal-name"
                  id="meal-name"
                  defaultValue={mealOnEdit.title || ''}
                  required
                />
              </p>
            </div>

            <div className="price">
              <label htmlFor="price">
                Unit Price (&#8358;)
              </label>
              <p className="input-div">
                <input
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  id="price"
                  min="0"
                  max="1000000"
                  defaultValue={mealOnEdit.price || ''}
                  required
                />
              </p>
            </div>

            <div className="dsc">
              <label htmlFor="dsc">
                Description
              </label>
              <p className="input-div desc">
                <input
                  type="text"
                  placeholder="Enter meal description"
                  name="dsc"
                  maxLength="60"
                  id="dsc"
                  defaultValue={mealOnEdit.description || ''}
                  required
                />
              </p>
            </div>

            <div>
              <label htmlFor="image">
                Image
              </label>
              <p className="input-div">
                <input
                  type="file"
                  placeholder="Enter img link"
                  name="image"
                  id="image"
                  defaultValue={mealOnEdit.image || ''}
                  onChange={() => {
                    uploadImage();
                  }}
                />
              </p>
            </div>

            {
              (imageToUpload)
              &&
              <div className="progress">
                <p id="progressBar" className="progressBar">0%</p>
              </div>
            }
            {
              (uploadedImageLink)
              &&
              <p className="uploadedImage">
                <img src={uploadedImageLink} alt="name" />
              </p>
            }


            {
              // show buttons based on state
              (!isEdit)
              &&
              (
                <p className="buttons">
                  <button
                    type="submit"
                    name="addbtn"
                    id="add-btn"
                    className="btn-2"
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
                <p className="buttons edit-buttons">
                  <button
                    type="submit"
                    name="updatebtn"
                    id="update-btn"
                    className="btn-2"
                    disabled={disableBtn}
                  >
                    <FontAwesome
                      name="arrow-circle-up"
                    />
                      UPDATE MEAL
                  </button>

                  <button
                    type="submit"
                    name="backbtn"
                    id="back-btn"
                    className="btn-2 back-btn"
                    disabled={disableBtn}
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
    </AccordionItemBody>
  </AccordionItem>
);

Mealform.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  addMeal: PropTypes.func.isRequired,
  updateMeal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  imageToUpload: PropTypes.string.isRequired,
  uploadedImageLink: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
  disableBtn: PropTypes.bool.isRequired,
  mealOnEdit: PropTypes.object.isRequired
};

export default Mealform;
