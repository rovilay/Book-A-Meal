import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import sweetAlert from 'sweetalert';

// import '../../assets/css/mealCard.css';
import { getFromLs } from '../../helpers/Ls';

const MealCard = (props) => {
  const {
    mealData,
    addToCart,
    deleteMeal,
    editMeal,
    cart
  } = props;

  const mealsInCart = (cart) && cart.map(meal => meal.id);
  const user = getFromLs('user');
  return (
    <div className="mealCard-container">
      <img className="meal-img" src={mealData.image} alt={mealData.title} />
      <div className="overlay1">
        <span className="meal-title">{mealData.title}</span>
      </div>
      <div className="overlay">
        <div className="meal-desc">
          <h4>{mealData.description}</h4>
        </div>
        {
          (user && user.admin)
          &&
          <div className="meal-desc">{moment(mealData.createdAt).format('LL')}</div>
        }
      </div>

      <div className="meal-label">
        {
          // show for customers and visitor only
          (user === null || (user && !user.admin))
          &&
          <button
            className="responsive-btn-2"
            disabled={(mealsInCart) && mealsInCart.includes(mealData.id)}
            onClick={
              () => {
                addToCart(mealData);
              }
            }
          >
            {
              (mealsInCart && mealsInCart.includes(mealData.id))
                ?
                'Meal In Cart'
                :
                'Add To Cart'
            }
          </button>
        }
        {
          // show for admin only
          (user && user.admin)
          &&
          (
            <button
              className="btn-3 box-shadow"
              onClick={() => {
                editMeal(mealData.id);
              }}
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
          // show for admin only
          (user && user.admin)
          &&
          (
            <button
              className="btn-3 box-shadow"
              onClick={(e) => {
                e.preventDefault();
                sweetAlert({
                  text: 'Are you sure you want to delete this meal?',
                  buttons: true,
                  dangerMode: true,
                })
                  .then((confirmed) => {
                    if (confirmed) {
                      deleteMeal(mealData.id);
                    }
                  })
                  .catch(err => err);
              }}
            >
              <FontAwesome
                name="trash"
                size="2x"
                className="trash"
              />
            </button>
          )
        }
        <span className="meal-price">&#8358; {mealData.price}</span>
      </div>
    </div>
  );
};


MealCard.defaultProps = {
  addToCart: undefined,
  deleteMeal: undefined,
  editMeal: undefined,
  cart: undefined
};

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  addToCart: PropTypes.func,
  deleteMeal: PropTypes.func,
  editMeal: PropTypes.func,
  cart: PropTypes.array,
};

export default MealCard;
