import React from 'react';
import { shallow } from 'enzyme';
import { meals } from '../../__mockData__/mealMock';
import MealCard from '../../../components/common/MealCard';


const props = {
  addMealToCart: jest.fn(),
  editMeal: jest.fn(),
  deleteMeal: jest.fn(),
  cart: meals,
  mealData: meals[0]
};

describe('MealCard component test', () => {
  const setup = () => shallow(<MealCard {...props} />);

  it('should render MealCard correctly', (done) => {
    localStorage.setItem('user', {
      admin: true
    });

    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `addMealToCart` if add button is clicked', (done) => {
    localStorage.setItem('user', {
      admin: false
    });

    props.cart = [];
    const wrapper = setup();

    wrapper.find('.responsive-btn-2').first().simulate('click')
    expect(props.addMealToCart).toHaveBeenCalled();

    done();
  });


  it('should call `handleDeleteMeal` if delete button is clicked', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    };

    const handleDeleteMealSpy= jest.spyOn(wrapper.instance(), 'handleDeleteMeal');
    wrapper.instance().handleDeleteMeal(event);
    expect(handleDeleteMealSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleEditMeal` if edit button is clicked', (done) => {
    const wrapper = setup();


    const handleEditMealSpy= jest.spyOn(wrapper.instance(), 'handleEditMeal');
    wrapper.instance().handleEditMeal();
    expect(handleEditMealSpy).toHaveBeenCalled();

    done();
  });
});
