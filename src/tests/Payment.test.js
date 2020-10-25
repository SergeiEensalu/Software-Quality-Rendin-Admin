import React from 'react';
import { shallow, mount } from 'enzyme';
import Payment from '../components/Payment';
import { create } from "react-test-renderer";

describe("Payment component", () => {
    test("snapshot test", () => {
        const payment = create(<Payment />);
        expect(payment.toJSON()).toMatchSnapshot();
    });
});
