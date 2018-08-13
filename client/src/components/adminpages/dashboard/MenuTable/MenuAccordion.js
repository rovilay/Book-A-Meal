import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import '../../../../assets/css/accordion.css';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import swal from 'sweetalert';

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
    // const nextPage = data.selected + 1;
    const { Meals: mealUrl, } = this.props.item;
    const { limit } = this.props.menuMeals.pagination;
    const nextOffset = (data.selected) * limit;
    // const url = `${mealUrl}&limit=${limit}&offset=${nextOffset}`;
    console.log(mealUrl);
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
      // updateMenu,
      // deleteMealInMenu,
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
                  (isInfo)
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
                  (isInfo)
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
                                // (meals.length <= 1)
                                //   ?
                                //   swal({
                                //     text: 'You a meal'
                                //   })

                                swal({
                                  text: 'Are you sure you want to remove this meal?',
                                  buttons: true,
                                  dangerMode: true,
                                })
                                  .then((confirmed) => {
                                    if (confirmed) {
                                      // deleteRow(item);

                                      const menuDate = item.postOn;
                                      const newMenuMeals = meals.filter(n => n.id === meal.id);
                                      // get id of meals to delete
                                      const MenuMealsToDelete = newMenuMeals.map(menuMeal => menuMeal.id);
                                      deleteMenuMeal({ menuDate, meals: MenuMealsToDelete });
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
  // deleteMealInMenu: PropTypes.func.isRequired,
  // getMeals: PropTypes.func.isRequired,
  // updateMenu: PropTypes.func.isRequired,
};

export default MenuAccordion;
