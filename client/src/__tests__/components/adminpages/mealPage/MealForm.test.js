import React from 'react';
import { shallow } from 'enzyme';
import  MealForm from '../../../../components/adminpages/mealPage/MealForm';
import { meals } from '../../../__mockData__/mealMock';


const props = {
  closeEdit: jest.fn(),
  addMeal: jest.fn(),
  handleChange: jest.fn(),
  updateMeal: jest.fn(),
  isEdit: true,
  imageToUpload: 'image.com',
  uploadedImageLink: 'http://image.com',
  uploadImage: jest.fn(),
  disableBtn: false,
  mealOnEdit: {
    ...meals[0],
    description: 'So sweet'
  }
};

describe('MealForm component test', () => {
  const setup = () => shallow(<MealForm {...props} />);

  it('should render MealForm correctly', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    }

    wrapper.find(`.back-btn`).simulate('click', event);
    wrapper.find(`.meal-form`).simulate('submit', event);
    expect(wrapper).toMatchSnapshot();
    expect(props.closeEdit).toHaveBeenCalled();
    expect(props.updateMeal).toHaveBeenCalled();

    done();
  });


  it('should call `addMeal` on meal form submit if not in edit state', (done) => {
    props.isEdit = false;
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    }

    wrapper.find(`.meal-form`).simulate('submit', event);
    expect(wrapper).toMatchSnapshot();
    expect(props.addMeal).toHaveBeenCalled();

    done();
  });


  it('should call `handleChange` on meal form input change', (done) => {
    props.isEdit = false;
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    }

    wrapper.find(`#meal-name`).simulate('change', event);
    wrapper.find(`#dsc`).simulate('change', event);
    wrapper.find(`#price`).simulate('change', event);
    expect(wrapper).toMatchSnapshot();
    expect(props.handleChange).toHaveBeenCalled();

    done();
  });
});
