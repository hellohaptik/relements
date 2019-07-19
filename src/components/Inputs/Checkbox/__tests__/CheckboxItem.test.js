/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Checkbox from "../Checkbox";

afterEach(cleanup);

const Component = ({ value, onChange, className, prefixClassName }) => (
  <Checkbox.Item
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
  expect(queryAllByTestId("checkbox-item").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(<Component value={true} className="test" />);
  expect(getByTestId("checkbox-item")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Checkbox.Item.classNames).map(className =>
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

  const checkboxOption = getByTestId("checkbox-item");

  fireEvent.click(checkboxOption);
  expect(mockFn).toHaveBeenCalledTimes(1);

  expect(mockFn.mock.calls[0][0]).toBe(false);

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  fireEvent.click(checkboxOption);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][0]).toBe(true);
});
