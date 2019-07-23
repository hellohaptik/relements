/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Radio from "../Radio";

afterEach(cleanup);

const Component = ({ value, onChange, className, prefixClassName }) => (
  <Radio
    label="Node Type"
    value={value}
    onChange={onChange}
    className={className}
    prefixClassName={prefixClassName}
    options={[{ title: "Good Node" }, { title: "Bad Node" }]}
  />
);

test("Smoke", async () => {
  const { queryAllByTestId } = render(
    <Component value={{ title: "Good Node" }} onChange={console.log} />,
  );
  expect(queryAllByTestId("radio").length).toBe(1);
});

test("Custom class", async () => {
  const { getByTestId } = render(
    <Component value={{ title: "Good Node" }} className="test" />,
  );
  expect(getByTestId("radio")).toHaveClass("test");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Radio.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container, getByTestId } = render(
    <Component value={{ title: "Good Node" }} prefixClassName="test" />,
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
  const { container, rerender } = render(
    <Component value={{}} prefixClassName="test" onChange={mockFn} />,
  );

  const RadioOption1 = container.getElementsByClassName("test-option")[0];
  const RadioOption2 = container.getElementsByClassName("test-option")[1];

  fireEvent.click(RadioOption1);
  expect(mockFn).toHaveBeenCalledTimes(1);

  expect(mockFn.mock.calls[0][0]).toMatchObject({ title: "Good Node" });

  rerender(
    <Component
      value={mockFn.mock.calls[0][0]}
      onChange={mockFn}
      prefixClassName="test"
    />,
  );

  fireEvent.click(RadioOption2);
  expect(mockFn).toHaveBeenCalledTimes(2);
  expect(mockFn.mock.calls[1][0]).toMatchObject({ title: "Bad Node" });

  fireEvent.click(RadioOption2);
  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(mockFn.mock.calls[2][0]).toMatchObject({ title: "Bad Node" });

  fireEvent.click(RadioOption1);
  expect(mockFn).toHaveBeenCalledTimes(4);
  expect(mockFn.mock.calls[3][0]).toMatchObject({ title: "Good Node" });
});
