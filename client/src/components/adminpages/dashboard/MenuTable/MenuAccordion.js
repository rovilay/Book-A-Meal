import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import '../../../../assets/css/accordion.css';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import swal from 'sweetalert';
import { SET_MENU_MEALS } from '../../../../actions/actiontypes';

class MenuAccordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfo: false,
      isEdit: false
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
    const { limit } = this.props.menuMealsPagination;
    const offset = (data.selected) * limit;
    const url = `${mealUrl}&limit=${limit}&offset=${offset}`;
    this.props.getMenuMeals(url)
      .then(() => {
        this.setState({ isInfo: true });
      });
  }

  render() {
    const {
      isInfo,
      isEdit
    } = this.state;
    const {
      item,
      menuMeals,
      getMenuMeals,
      editMenu,
      updateMenu,
      deleteMealInMenu,
      menuMealsPagination
    } = this.props;

    const {
      numOfPages
    } = menuMealsPagination;
    // const menu = {
    //   sn: item.sn,
    //   menuId: item.menuId,
    //   postOn: moment(item.postOn).format('LL'),
    //   createdBy: item.createdBy,
    // };

    const {
      sn,
      menuId,
      createdBy,
      Meals: mealUrl
    } = item;

    const postOn = moment(item.postOn).format('LLL');
    // const today = new Date();

    return (
      <Accordion key={sn}>
        <AccordionItem>
          <AccordionItemTitle>
            <h3>{sn} {postOn}</h3>
            <FontAwesome
              name="chevron-down"
            />
          </AccordionItemTitle>

          <AccordionItemBody>
            <div className="accordion-body">
              <div className="menuContainer">
                <div className="menu-details">
                  <p className="menu-id">
                    <span>Id:</span>
                    <span>{menuId}</span>
                  </p>
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
                        getMenuMeals(mealUrl)
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
                    <div className="meal-hide-add-btns">
                      <button
                        className="btn-2 hide-meals-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          getMenuMeals(mealUrl)
                            .then(() => {
                              this.setState({ isInfo: false });
                            });
                        }}
                      >
                        Hide Meals
                      </button>

                      <button
                        className="btn-2 add-meals-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          getMenuMeals(mealUrl)
                            .then(() => {
                              this.setState({ isInfo: false });
                            });
                        }}
                      >
                        Add Meals
                      </button>
                    </div>
                    )
                  }

                  {
                    (menuMeals.length > 0 && isInfo)
                    &&
                    <div className="meals">
                      {
                        menuMeals.map((meal, i) => (
                          <div
                            id={meal.id}
                            className="meal"
                            key={i}
                          >
                            <span>
                              {meal.title}
                            </span>
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
                                      // deleteRow(item);
                                      const menuDate = moment(new Date(item.postOn)).format('DD/MM/YYYY');
                                      const newMenuMeals = menuMeals.filter(n => n.id !== meal.Id);

                                      // get meals id
                                      const meals = newMenuMeals.map(menuMeal => menuMeal.id);
                                      updateMenu({ menuDate, meals })
                                        .then((res) => {
                                          if (res.success) {
                                            deleteMealInMenu(meal.id);
                                          }
                                        });
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
                          </div>
                        ))
                      }
                    </div>
                  }
                </div>
                {
                  (menuMeals.length > 9 && isInfo)
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
      </Accordion>
    );
  }
}


MenuAccordion.propTypes = {
  item: PropTypes.object.isRequired,
  editMenu: PropTypes.func.isRequired,
  getMenuMeals: PropTypes.func.isRequired,
  menuMeals: PropTypes.array.isRequired,
  deleteMealInMenu: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  menuMealsPagination: PropTypes.object.isRequired
};

export default MenuAccordion;
