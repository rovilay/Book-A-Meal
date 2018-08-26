import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import swal from 'sweetalert';
import '../../../../assets/css/accordion.css';

class MenuAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfo: false,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  /**
   * handles pagination changes
   *
   * @param {object} data data object from pagination component
   */
  handlePaginationClick(data) {
    const { Meals: mealUrl, } = this.props.item;
    const { limit } = this.props.menuMeals.pagination;
    const nextOffset = (data.selected) * limit;
    this.props.getMenuMeals(mealUrl, { limit, offset: nextOffset })
      .then(() => {
        this.setState({ isInfo: true });
      });
  }

  render() {
    const {
      isInfo,
    } = this.state;
    const {
      item,
      menuMeals,
      getMenuMeals,
      editMenu,
      deleteMenuMeal
    } = this.props;

    const { meals, pagination } = menuMeals;
    const {
      numOfPages,
      count
    } = pagination;

    const {
      sn,
      menuId,
      createdBy,
      Meals: mealUrl
    } = item;

    const postOn = moment(item.postOn).format('LL');
    const today = moment().format('YYYY-MM-DD');

    return (
      <AccordionItem key={sn}>
        <AccordionItemTitle>
          <h3>
            <span className="serial">{sn}</span>
            <span className="postOn">{postOn}</span>
          </h3>
          <FontAwesome
            name="chevron-down"
          />
        </AccordionItemTitle>

        <AccordionItemBody>
          <div className="accordion-body">
            <div className="menuContainer">
              <div className="menu-details">
                <p className="menu-id">
                  <span>Post On:</span>
                  <span>{postOn}</span>
                </p>
                <p className="menu-id">
                  <span>Created By:</span>
                  <span>{createdBy}</span>
                </p>
              </div>

              <div className="menu-meals">
                {
                  (!isInfo)
                  &&
                  (
                  <button
                    className="btn-2 show-meals-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      getMenuMeals(mealUrl, {})
                        .then(() => {
                          this.setState({ isInfo: true });
                        });
                    }}
                  >
                    Show Meals
                  </button>
                  )
                }

                {
                  (isInfo) // for moble views
                  &&
                  (
                  <div className="meal-hide-add-btns show-mobile">
                    <button
                      className="responsive-btn-2 hide-meals-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ isInfo: false });
                      }}
                    >
                      <FontAwesome
                        name = "eye-slash"
                        size = "lg"
                      />
                    </button>

                    {
                      // hide if menu date has passed
                      (moment(today).isSameOrBefore(item.postOn))
                      &&
                      <button
                        className="responsive-btn-2 add-meals-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          editMenu({ menuId, postOn, meals });
                        }}
                      >
                        <FontAwesome
                          name = "plus"
                          size = "lg"
                        />
                      </button>
                    }
                  </div>
                  )
                }
                {
                  (isInfo) // for large screen
                  &&
                  (
                  <div className="meal-hide-add-btns hide-mobile">
                    <button
                      className="responsive-btn-2 hide-meals-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ isInfo: false });
                      }}
                    >
                      Hide Meals
                    </button>
                    {
                      // hide if menu date has passed
                      (moment(today, 'YYYY-MM-DD').isSameOrBefore(item.postOn))
                      &&
                      <button
                        className="responsive-btn-2 add-meals-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          editMenu({ menuId, postOn, meals });
                        }}
                      >
                        Add Meals
                      </button>
                    }
                  </div>
                  )
                }

                {
                  // menu meals
                  (meals.length > 0 && isInfo)
                  &&
                  <div className="meals">
                    {
                      meals.map((meal, i) => (
                        <div
                          id={meal.id}
                          className="meal"
                          key={i}
                        >
                          <span>
                            {meal.title}
                          </span>

                          {
                            // hide if menu date has passed
                            (moment(today, 'YYYY-MM-DD').isSameOrBefore(item.postOn))
                            &&
                            <button
                              className="btn-3 box-shadow"
                              onClick={(e) => {
                                e.preventDefault();

                                swal({
                                  text: 'Are you sure you want to remove this meal?',
                                  buttons: true,
                                  dangerMode: true,
                                })
                                  .then((confirmed) => {
                                    if (confirmed) {
                                      const newMenuMeals = meals.filter(n => n.id === meal.id);
                                      const MenuMealsToDelete = newMenuMeals.map(menuMeal => menuMeal.id);
                                      deleteMenuMeal({ mealUrl, meals: MenuMealsToDelete });
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
                          }
                        </div>
                      ))
                    }
                  </div>
                }

                {
                  (meals.length < 1 && isInfo)
                  &&
                  <span className="empty not-found">
                      Your meals are not in this menu
                  </span>
                }
              </div>
              {
                (count > 5 && isInfo)
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
        </AccordionItemBody>
      </AccordionItem>
    );
  }
}


MenuAccordion.propTypes = {
  item: PropTypes.object.isRequired,
  editMenu: PropTypes.func.isRequired,
  getMenuMeals: PropTypes.func.isRequired,
  deleteMenuMeal: PropTypes.func.isRequired,
  menuMeals: PropTypes.object.isRequired,
};

export default MenuAccordion;
