import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

test('test Header component', () => {

    const wrapper = mount(<Header />);
    expect(wrapper).toContainHTML;

});
