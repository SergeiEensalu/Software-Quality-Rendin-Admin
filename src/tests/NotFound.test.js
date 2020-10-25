import React from 'react';
import { shallow, mount } from 'enzyme';
import NotFound from '../components/NotFound';

test('test NotFound component', () => {
    const wrapper = mount(<NotFound />);
    expect(wrapper).toContainHTML;
});
