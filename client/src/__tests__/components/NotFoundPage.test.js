import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';


describe('NotFoundPage component test', () => {
  it('should render NotFoundPage correctly', (done) => {
    const wrapper = shallow(<NotFoundPage />);

    expect(wrapper).toMatchSnapshot();

    done();
  });
});

