import React from 'react';
import { shallow } from 'enzyme';
import { NotFoundPage } from '../../components/NotFoundPage';


describe('NotFoundPage component test', () => {
  const props = {
    setNav: jest.fn()
  };

  it('should render NotFoundPage correctly', (done) => {
    const wrapper = shallow(<NotFoundPage {...props} />);

    expect(wrapper).toMatchSnapshot();

    done();
  });
});

