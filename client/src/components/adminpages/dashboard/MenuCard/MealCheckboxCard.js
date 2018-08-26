/* eslint react/no-unused-prop-types:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

class MealCheckBoxCard extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }


  handlePaginationClick(data) {
    const { getMeals, mealPagination } = this.props;
    const { limit } = mealPagination;
    const currentPage = data.selected;
    const nextOffset = currentPage * limit;

    getMeals({ limit, offset: nextOffset });
  }

  render() {
    const {
      newMenuMeals,
      mealPagination,
      setNewMenuMeal
    } = this.props;

    const {
      numOfPages,
      count
    } = mealPagination;

    return (
      <div className="mealsCheckbox">
        <div className="checkbox-card">
          { this.props.meals.map(meal => (
            <p key={meal.id}>
              <label htmlFor={meal.id}>
                {meal.title}
              </label>
              <input
                type="checkbox"
                name="meal-check"
                className="meal-check"
                id={`checkbox-${meal.id}`}
                defaultChecked={newMenuMeals.includes(meal.id)}
                onClick={() => {
                  setNewMenuMeal(meal.id);
                }
                }
                value={meal.id}
              />
            </p>
          ))}
        </div>
        {
          (count > 10)
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
    );
  }
}

MealCheckBoxCard.propTypes = {
  meals: PropTypes.array.isRequired,
  setNewMenuMeal: PropTypes.func.isRequired,
  mealPagination: PropTypes.object.isRequired,
  getMeals: PropTypes.func.isRequired,
  newMenuMeals: PropTypes.array.isRequired
};

export default MealCheckBoxCard;
