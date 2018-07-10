import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import tableHead from '../../../../helpers/tableHead';
import TableHead from '../../../common/Table/TableHead';
import MealTableRow from './mealTableRow';

const MealTable = (props) => {
  const { filteredMeals } = props;
  const sortedMeals = filteredMeals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <div>
      <table>
        <TableHead tableHead={tableHead.mealTableHead} />
        <tbody>
          {
            sortedMeals.map((meal, i) => {
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
};

MealTable.propTypes = {
  filteredMeals: PropTypes.array.isRequired,
};

export default MealTable;
