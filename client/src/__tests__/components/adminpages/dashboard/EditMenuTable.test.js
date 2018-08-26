import React from 'react';
import { shallow } from 'enzyme';
import EditMenuTable from '../../../../components/adminpages/dashboard/MenuTable/EditMenuTable';
import { menuMeals, menus } from '../../../__mockData__/menuMock';

describe('EditMenuTable component test', () => {
  const setup = () => {
    const props = {
      title: "edit menu",
      addMealInEditMenu: () => jest.fn(),
      deleteMealInEditMenu: () => jest.fn(),
      meals: menuMeals,
      hideModal: () => jest.fn(),
      editMenuMeals: menuMeals,
      updateMenu: () => jest.fn(),
      content: {
        menuId: menus[0].id,
        meals: menuMeals.slice(0, 2)
      }
    };

    return shallow(<EditMenuTable {...props} />)
  };


  it('should render EditMenuTable correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `toggleMealCheckbox`', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    `<div>
      <input type="checkbox" id="${menuMeals[0].id}-edit" checked="true" />
    </div>`;

    const toggleMealCheckboxSpy= jest.spyOn(wrapper.instance(), 'toggleMealCheckbox');
    wrapper.instance().toggleMealCheckbox(menuMeals[0])
    expect(toggleMealCheckboxSpy).toHaveBeenCalled();

    done();
  });

  it('should call `toggleMealCheckbox` on button click', (done) => {
    const wrapper = setup();

    document.body.innerHTML =
    `<div>
      <input type="checkbox" id="${menuMeals[3].id}-edit" checked="true" />
    </div>`;

    wrapper.find(`.meal-check`).last().simulate('click');
    const toggleMealCheckboxSpy= jest.spyOn(wrapper.instance(), 'toggleMealCheckbox');
    wrapper.instance().toggleMealCheckbox(menuMeals[3])
    expect(toggleMealCheckboxSpy).toHaveBeenCalled();

    done();
  });


  it('should call `updateMenu`', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn()
    }

    const updateMenuSpy= jest.spyOn(wrapper.instance(), 'updateMenu');
    wrapper.instance().updateMenu(event)
    expect(updateMenuSpy).toHaveBeenCalled();

    done();
  });
});
