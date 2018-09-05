import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import MenuAccordion from './MenuAccordion';

class MenuTable extends Component {
  constructor(props) {
    super(props);

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  handlePaginationClick(data) {
    const { limit } = this.props.pagination;
    const currentPage = data.selected;
    const newOffset = currentPage * limit;

    this.props.getAllMenus({ limit, offset: newOffset });
  }

  render() {
    const { menus, pagination } = this.props;
    const {
      count,
      numOfPages,
      offset,
    } = pagination;

    return (
      <div className="accordion-container">
        {
          menus.map((menu, i) => {
            const {
              id: menuId,
              postOn,
              User,
              Meals
            } = menu;
            const item = {
              sn: ++i + offset,
              menuId,
              postOn,
              createdBy: `${User.firstName} ${User.lastName}`,
              Meals
            };
            return (
              <MenuAccordion
                key={menuId}
                item={item}
                {...this.props}
              />
            );
          })
        }
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

MenuTable.propTypes = {
  menus: PropTypes.array.isRequired,
  getAllMenus: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
};

export default MenuTable;
