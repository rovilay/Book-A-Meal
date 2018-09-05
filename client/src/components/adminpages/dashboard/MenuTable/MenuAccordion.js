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
import sweetAlert from 'sweetalert';


class MenuAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfo: false,
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleAccordionBodyClose = this.handleAccordionBodyClose.bind(this);
    this.handleAccordionItemTitleFocus = this.handleAccordionItemTitleFocus.bind(this);
    this.showMenuMeals = this.showMenuMeals.bind(this);
    this.hideMenuMeals = this.hideMenuMeals.bind(this);
    this.handleAddMealsToMenu = this.handleAddMealsToMenu.bind(this);
    this.deleteMealInMenu = this.deleteMealInMenu.bind(this);
  }

  /**
   * closes accordion body if menu meals is on show
   *
   * @param {object} className className of DOM element to watch for
   */
  handleAccordionBodyClose(className) {
    const element = document.querySelector(className);
    if (element) {
      const bodySelected = element.getAttribute('aria-selected');
      (bodySelected) && this.setState({ isInfo: false });
    }
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

  /**
   * closes accordion on focus
   */
  handleAccordionItemTitleFocus() {
    return this.handleAccordionBodyClose(`.myaccordiontitle-${this.props.item.menuId}`);
  }

  /**
   * shows menu meals
   * @param {*} event DOM event
   */
  showMenuMeals(event) {
    event.preventDefault();
    const { Meals: mealUrl } = this.props.item;
    this.props.getMenuMeals(mealUrl, {})
      .then(() => {
        this.setState({ isInfo: true });
      });
  }

  /**
   * hides menu meals
   * @param {*} event DOM event
   */
  hideMenuMeals(event) {
    event.preventDefault();
    this.setState({ isInfo: false });
  }

  /**
   * set menu to add meals
   * @param {*} event DOM event
   */
  handleAddMealsToMenu(event) {
    event.preventDefault();
    const { item, menuMeals } = this.props;
    const { meals } = menuMeals;

    const postOn = moment(item.postOn).format('LL');
    this.props.editMenu({ menuId: item.menuId, postOn, meals });
  }

  /**
   * deletes meal in a menu
   * @param {*} meal meal to delete
   */
  deleteMealInMenu(meal) {
    return (event) => {
      event.preventDefault();
      const { item, menuMeals } = this.props;
      const { Meals: mealUrl } = item;
      const { meals } = menuMeals;

      sweetAlert({
        text: 'Are you sure you want to remove this meal?',
        buttons: true,
        dangerMode: true,
      })
        .then((confirmed) => {
          if (confirmed) {
            const MenuMealsToDelete = meals.filter(n => n.id === meal.id);
            const MenuMealsToDeleteIds = MenuMealsToDelete.map(menuMeal => menuMeal.id);
            this.props.deleteMenuMeal({ mealUrl, meals: MenuMealsToDeleteIds });
          }
        })
        .catch(err => err);
    };
  }

  render() {
    const {
      isInfo,
    } = this.state;

    const {
      item,
      menuMeals,
    } = this.props;

    const {
      meals,
      pagination
    } = menuMeals;

    const {
      numOfPages,
      count
    } = pagination;

    const {
      sn,
      menuId,
      createdBy
    } = item;

    const postOn = moment(item.postOn).format('LL');
    const today = moment().format('YYYY-MM-DD');

    return (
      <AccordionItem
        key={sn}
        hiddenbodyclassname="myhide-accordion"
      >
        <AccordionItemTitle
          className={`accordion__title myaccordiontitle-${menuId}`}
          onFocus={this.handleAccordionItemTitleFocus}
        >
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
                    onClick={this.showMenuMeals}
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
                      onClick={this.hideMenuMeals}
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
                        onClick={this.handleAddMealsToMenu}
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
                      onClick={this.hideMenuMeals}
                    >
                      Hide Meals
                    </button>
                    {
                      // hide if menu date has passed
                      (moment(today, 'YYYY-MM-DD').isSameOrBefore(item.postOn))
                      &&
                      <button
                        className="responsive-btn-2 add-meals-btn"
                        onClick={this.handleAddMealsToMenu}
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
                              className="btn-3 box-shadow deleteMeal"
                              onClick={this.deleteMealInMenu(meal)}
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
