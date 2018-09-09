import React from 'react';
import { shallow } from 'enzyme';
import MealCheckboxCard from '../../../../components/adminpages/dashboard/MenuCard/MealCheckboxCard';
import { menuMeals } from '../../../__mockData__/menuMock';


const props = {
  meals: menuMeals,
  setNewMenuMeal: jest.fn(),
  mealPagination: {
    limit: 12,
    count: 13,
    numOfPages: 2
  },
  getMeals: jest.fn(),
  newMenuMeals: menuMeals.slice(0, 2)
};

describe('MealCheckboxCard component test', () => {
  const setup = () => shallow(<MealCheckboxCard {...props} />);


  it('should render MealCheckboxCard correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` meal pagination button is clicked',
  (done) => {
    const wrapper = setup();

    const data = {
      selected: 1
    };

    const handlePaginationClickSpy= jest.spyOn(
      wrapper.instance(), 'handlePaginationClick'
    );
    wrapper.instance().handlePaginationClick(data)
    expect(handlePaginationClickSpy).toHaveBeenCalled();

    done();
  });

  it('should call `setNewMenuMeal` if meals checked box is checked', (done) => {
    const wrapper = setup();

    wrapper.find(`.meal-check`).first().simulate('click');
    expect(props.setNewMenuMeal).toHaveBeenCalled()

    done();
  });
});
