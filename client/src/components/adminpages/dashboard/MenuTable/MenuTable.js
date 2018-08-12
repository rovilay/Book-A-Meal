import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import MenuAccordion from './MenuAccordion';

const MenuTable = (props) => {
  const { menus, pagination } = props;
  const {
    count,
    numOfPages,
    offset,
    limit
  } = pagination;

  const handlePaginationClick = (data) => {
    const currentPage = data.selected;
    const newOffset = currentPage * limit;

    props.getAllMenus({ limit, offset: newOffset });
  };

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
              {...props}
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
          onPageChange={handlePaginationClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
    }
    </div>
  );
};

MenuTable.propTypes = {
  menus: PropTypes.array.isRequired,
  getAllMenus: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
};

export default MenuTable;
