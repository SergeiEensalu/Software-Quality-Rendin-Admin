import React from 'react';
import { shallow, mount } from 'enzyme';
import { create } from "react-test-renderer";
import Item from '../components/Item';

describe("Item component", () => {
    test("snapshot test", () => {
        const item = create(<Item />);
        expect(item.toJSON()).toMatchSnapshot();
    });
});

