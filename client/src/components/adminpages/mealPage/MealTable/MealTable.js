import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { mealTableHead } from '../../../../helpers/tableHeadData';
import TableHead from '../../../common/Table/TableHead';
import MealTableRow from './MealTableRow';

const MealTable = props => (
  <div>
    <table>
      <TableHead tableHeadData={mealTableHead} />
      <tbody>
        {
          props.meals.map((meal, i) => {
            const {
              id: mealId,
              price: unitPrice,
              description,
              title: Meal,
              image,
              createdAt
            } = meal;
            const item = {
              sn: ++i,
              mealId,
              Meal,
              unitPrice,
              description,
              image,
              createdAt: moment(createdAt).format('LL'),
            };
            return (
              <MealTableRow
                key={mealId}
                item={item}
                {...props}
              />
            );
          })
        }
      </tbody>
    </table>
  </div>
);

MealTable.propTypes = {
  meals: PropTypes.array.isRequired,
};

export default MealTable;
