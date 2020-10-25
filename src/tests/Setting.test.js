import React from 'react';
import { shallow, mount } from 'enzyme';
import Settings from '../components/Settings';
import { create } from "react-test-renderer";

describe("Settings component", () => {
    test("snapshot test", () => {
        const settings = create(<Settings />);
        expect(settings.toJSON()).toMatchSnapshot();
    });
});
