import React from 'react';
import { shallow } from 'enzyme';
import FilterComp from '../../../components/common/Filter';


describe('Filter component test', () => {
  const setup = () => {
    const props = {
      setFilter: () => jest.fn()
    };

    return shallow(<FilterComp {...props} />)
  };

  it('should render FilterComp correctly', (done) => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();

    done();
  });

  it('should call `setFilter` on submitting form', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'date',
        value: '2018-08-27'
      }
    };

    const handleFormSubmitSpy= jest.spyOn(wrapper.instance(), 'handleFormSubmit');
    wrapper.instance().handleFormSubmit(event)
    expect(handleFormSubmitSpy).toHaveBeenCalled();
    done();
  });

  it('should update state on filter input change', (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: () => jest.fn(),
      target: {
        name: 'filter',
        value: 'month'
      }
    };

    wrapper.find('#filter').simulate('change', event);
    expect(wrapper.instance().state.filter).toEqual('month');

    done();
  });
});
