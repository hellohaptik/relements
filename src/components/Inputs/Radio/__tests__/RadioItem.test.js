/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Radio from "../Radio";

afterEach(cleanup);

const Component = ({ value, onChange, className, prefixClassName }) => (
  <Radio.Item
    label="Node Type"
    value={value}
    onChange={onChange}
    className={className}
    prefixClassName={prefixClassName}
  />
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(
    <Component value={true} onChange={console.log} />,
  );
  expect(queryAllByTestId("radio-item").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component value={true} className="test" />);
  expect(getByTestId("radio-item")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Radio.Item.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    <Component value={true} prefixClassName="test" />,
  );

  classNames.forEach(className => {
    expect(
      container.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On Change", async () => {
  const mockFn = jest.fn();
  const { getByTestId, rerender } = render(
    <Component value={true} prefixClassName="test" onChange={mockFn} />,
  );

  const RadioOption = getByTestId("radio-item");

  fireEvent.click(RadioOption);
  expect(mockFn).toHaveBeenCalledTimes(1);

  expect(mockFn.mock.calls[0][0]).toBe(false);

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  fireEvent.click(RadioOption);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][0]).toBe(true);
});
