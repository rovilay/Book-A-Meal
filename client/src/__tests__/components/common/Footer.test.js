import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/common/Footer';


describe('Footer component test', () => {
  it('should render Footer correctly', (done) => {
    const wrapper = shallow(<Footer />);

    expect(wrapper).toMatchSnapshot();

    done();
  });
});

