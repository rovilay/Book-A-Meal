import React from 'react';
import { shallow } from 'enzyme';
import MenuTable from '../../../../components/adminpages/dashboard/MenuTable/MenuTable';
import { menus } from '../../../__mockData__/menuMock';

describe('MenuTable component test', () => {
  const setup = () => {
    const props = {
      menus: [{
        ...menus[0],
        User: {
          firstName: 'ogooluwa',
          lastName: 'akinola'
        }
      }],
      getAllMenus: jest.fn(),
      pagination: {
        limit: 12,
        count: 13,
        numOfPages: 2
      },
      editMenu: jest.fn(),
      getMenuMeals: jest.fn()
    };

    return shallow(<MenuTable {...props} />)
  };


  it('should render MenuTable correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });


  it('should call `handlePaginationClick` if menu pagination button is clicked',
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
});
