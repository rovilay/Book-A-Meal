/* eslint jsx-a11y/label-has-for:0 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import ModalTableRow from '../../../common/Table/ModalTableRow';

const EditMenuTable = (props) => {
  const {
    title,
    content,
    submitUpdate
  } = props;
  const meals = [];
  const menuDate = moment(new Date(content.postOn)).format('DD/MM/YYYY');

  return (
    <div className="table-container">
      <h2 className="title">
        {title}
      </h2>

      <hr />

      <form onSubmit={(e) => {
        e.preventDefault();
        submitUpdate(menuDate, meals);
      }}
      >
        <p>
          Post On: {content.postOn}
        </p>
        <table>
          <TableHead tableHead={tableHead.editMenuHead} />
          <tbody>
            {
              content.meals.map((meal, i) => {
                const {
                  id,
                  title: Meal,
                  price: unitPrice,
                  description
                } = meal;
                meals.push(id);
                const item = {
                  sn: ++i,
                  Meal,
                  unitPrice,
                  description
                };

                return (
                  <ModalTableRow
                    key={id}
                    item={item}
                    id={id}
                    {...props}
                  />
                );
              })
            }
          </tbody>
        </table>

        <div className="menu-updatebtn">
          <button
            type="submit"
            name="updateMenuBtn"
            id="menu-btn"
            className="update-btn btn-1"
            disabled={meals.length <= 0}
          >
            Update Menu
          </button>
        </div>
      </form>
    </div>
  );
};

EditMenuTable.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  submitUpdate: PropTypes.func.isRequired,
};

export default EditMenuTable;

