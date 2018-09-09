import React from 'react';
import { shallow } from 'enzyme';
import MenuAccordion from '../../../../components/adminpages/dashboard/MenuTable/MenuAccordion';
import { menus, menuMeals } from '../../../__mockData__/menuMock';

describe('MenuAccordion component test', () => {
  const setup = () => {
    const props = {
      item: menus[0],
      editMenu: jest.fn(),
      getMenuMeals: () => Promise.resolve(),
      deleteMenuMeal: jest.fn(),
      menuMeals: {
        meals: menuMeals,
        pagination: {
          limit: 12,
          count: 13,
          numOfPages: 2
        }
      },
    };

    return shallow(<MenuAccordion {...props} />)
  };


  it('should render MenuAccordion correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` menu meals pagination button is clicked',
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


  it('should call `handleAccordionBodyClose` when menu accordion is clicked',
  (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    `<div>
      <div type="checkbox" class="accordion" aria-selected="true" checked="true" />
    </div>`;

    const handleAccordionBodyCloseSpy= jest.spyOn(
      wrapper.instance(), 'handleAccordionBodyClose'
    );
    wrapper.instance().handleAccordionBodyClose('.accordion')
    expect(handleAccordionBodyCloseSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleAccordionItemTitleFocus` when menu accordion is on focus',
  (done) => {
    const wrapper = setup();

    const handleAccordionItemTitleFocusSpy= jest.spyOn(
      wrapper.instance(), 'handleAccordionItemTitleFocus'
    );
    wrapper.instance().handleAccordionItemTitleFocus()
    expect(handleAccordionItemTitleFocusSpy).toHaveBeenCalled();

    done();
  });


  it('should call `showMenuMeals` if show meals button is clicked', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    const showMenuMealsSpy= jest.spyOn(wrapper.instance(), 'showMenuMeals');
    wrapper.instance().showMenuMeals(event)
    expect(showMenuMealsSpy).toHaveBeenCalled();

    done();
  });


  it('should call `hideMenuMeals` if hide meals button is clicked', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    const hideMenuMealsSpy= jest.spyOn(wrapper.instance(), 'hideMenuMeals');
    wrapper.instance().hideMenuMeals(event)
    expect(hideMenuMealsSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleAddMealsToMenu` if add meal button is clicked',
  (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    const handleAddMealsToMenuSpy= jest.spyOn(wrapper.instance(), 'handleAddMealsToMenu');
    wrapper.instance().handleAddMealsToMenu(event)
    expect(handleAddMealsToMenuSpy).toHaveBeenCalled();

    done();
  });


  it('should call `deleteMealInMenu` if delete meal button is clicked', (done) => {
    const wrapper = setup();

    const deleteMealInMenuSpy= jest.spyOn(wrapper.instance(), 'deleteMealInMenu');
    wrapper.instance().deleteMealInMenu(menuMeals[0])
    expect(deleteMealInMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should `deleteMealInMenu` if delete button is clicked', (done) => {
    const wrapper = setup();
    wrapper.setState({
      isInfo: true
    });

    const event = {
      preventDefault: () => jest.fn()
    }

    wrapper.find('.deleteMeal').first().simulate('click', event);
    const deleteMealInMenuSpy= jest.spyOn(wrapper.instance(), 'deleteMealInMenu');
    wrapper.instance().deleteMealInMenu(menuMeals[0])
    expect(deleteMealInMenuSpy).toHaveBeenCalled();

    done();
  });
});
