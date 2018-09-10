import React from 'react';
import { shallow } from 'enzyme';
import { MealPage, mapStateToProps  } from '../../../../components/adminpages/mealPage/Index';
import { mealDefaultState } from '../../../../reducers/mealReducer';
import { filterDefaultState } from '../../../../reducers/filterReducer';
import { meals } from '../../../__mockData__/mealMock';

const props = {
  mealError: 'Error',
  setNav: jest.fn(),
  getMeals: jest.fn(),
  setMealForEdit: jest.fn(),
  removeMealFromEdit: jest.fn(),
  mealOnEdit: {
    ...meals[0],
    description: 'so sweet'
  },
  postMeal: jest.fn(),
  updateMeal: jest.fn(),
  deleteMeal: jest.fn(),
  setFilter: jest.fn(),
  meals,
  pagination: {
    limit: 12,
    count: 13,
    numOfPages: 2
  },
  updateMealOnEdit: jest.fn()
};

describe('MealPage component test', () => {
  const setup = () => shallow(<MealPage {...props} />);


  it('should render MealPage correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `onUpdateMeal` if update meal button is clicked', (done) => {
    const wrapper = setup();

    const onUpdateMealSpy= jest.spyOn(wrapper.instance(), 'onUpdateMeal');
    wrapper.instance().onUpdateMeal(props.mealOnEdit.id)
    expect(onUpdateMealSpy).toHaveBeenCalled();

    done();
  });


  it('should call `getFormValues` when submitting meal form', (done) => {
    const wrapper = setup();
    wrapper.setState({
      isEdit: false
    })

    document.body.innerHTML =
    `<div>
      <input type="text" id="meal-name" value="Eba and Egusi" />
      <input type="text" id="dsc" value="So sweet" />
      <input type="number" id="price" value="200" />
    </div>`;

    const getFormValuesSpy= jest.spyOn(wrapper.instance(), 'getFormValues');
    wrapper.instance().getFormValues()
    expect(getFormValuesSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleChange` if meal form input is being changed', (done) => {
    const wrapper = setup();

    const event = {
      target: {
        name: 'title',
        value: 'Eba and Egusi'
      }
    }

    const handleChangeSpy= jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().handleChange(event)
    expect(handleChangeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `checkFileSize` if meal image is being uploaded on meal form',
  (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    document.body.innerHTML =
    `<div>
      <input type="file" id="meal-image" value="image.png" />
    </div>`;

    const checkFileSizeSpy= jest.spyOn(wrapper.instance(), 'checkFileSize');
    wrapper.instance().checkFileSize(event)
    expect(checkFileSizeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `fillForm` on edit button click', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    `<div>
      <input type="text" id="meal-name" value="Eba and Egusi" />
      <input type="text" id="dsc" value="So sweet" />
      <input type="number" id="price" value="200" />
    </div>`;

    const fillFormSpy= jest.spyOn(wrapper.instance(), 'fillForm');
    wrapper.instance().fillForm()
    expect(fillFormSpy).toHaveBeenCalled();

    done();
  });


  it('should call `clearForm` on on back button click', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    `<div>
      <input type="text" id="meal-name" value="Eba and Egusi" />
      <input type="text" id="dsc" value="So sweet" />
      <input type="number" id="price" value="200" />
      <input type="file" id="meal-image" value="200" />
    </div>`;

    const clearFormSpy= jest.spyOn(wrapper.instance(), 'clearForm');
    wrapper.instance().clearForm()
    expect(clearFormSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handlePaginationClick` if pagination button is clicked',
  (done) => {
    const wrapper = setup();

    const data = {
      selected: 1
    };

    const handlePaginationClickSpy= jest.spyOn(wrapper.instance(), 'handlePaginationClick');
    wrapper.instance().handlePaginationClick(data)
    expect(handlePaginationClickSpy).toHaveBeenCalled();

    done();
  });


  it('should call `closeEdit` on update button click', (done) => {
    const wrapper = setup();

    const closeEditSpy= jest.spyOn(wrapper.instance(), 'closeEdit');
    wrapper.instance().closeEdit()
    expect(closeEditSpy).toHaveBeenCalled();

    done();
  });

  it('should call `editMeal` on edit button click', (done) => {
    const wrapper = setup();

    const editMealSpy= jest.spyOn(wrapper.instance(), 'editMeal');
    wrapper.instance().editMeal(meals[0].id)
    expect(editMealSpy).toHaveBeenCalled();

    done();
  });


  it('should call `onAddMeal` if add meal form is submitted', (done) => {
    const wrapper = setup();
    wrapper.setState({
      isEdit: false
    })

    document.body.innerHTML =
    `<div>
      <input type="text" id="meal-name" value="Eba and Egusi" />
      <input type="text" id="dsc" value="So sweet" />
      <input type="number" id="price" value="200" />
    </div>`;

    const onAddMealSpy= jest.spyOn(wrapper.instance(), 'onAddMeal');
    wrapper.instance().onAddMeal()
    expect(onAddMealSpy).toHaveBeenCalled();

    done();
  });


  it('should map state to props', () => {
    const initialState = {
      filter: {
        ...filterDefaultState
      },
      meal: {
        ...mealDefaultState
      }
    };

    const ownProps = {
      meals,
      mealOnEdit: {
        ...meals[0],
        description: 'so sweet'
      },
      mealError: 'Error',
      pagination: {
        limit: 12,
        offset: 0,
        count: 13,
        nextOffset: 12
      }
    };

    const tree = mapStateToProps(initialState, ownProps);
    expect(tree).toMatchSnapshot();
  })
});
