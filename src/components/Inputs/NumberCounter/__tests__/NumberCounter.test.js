/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import NumberCounter from "../NumberCounter";

afterEach(cleanup);

const component = props => <NumberCounter prefixClassName="test" {...props} />;

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("numberCounter")).toBeInTheDocument();
});

test("Label", async () => {
  const { container } = render(component({ label: "label" }));
  expect(container.getElementsByClassName("test-label").length).toBe(1);
});

test("Custom Class", async () => {
  const { getByTestId } = render(component({ className: "testClass" }));
  expect(getByTestId("numberCounter")).toHaveClass("testClass");
});

test("Error", async () => {
  const { container } = render(component({ error: "error" }));
  expect(container.getElementsByClassName("test-error").length).toBe(1);
});

test("Prefix class", async () => {
  const classNames = Object.keys(NumberCounter.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    component({
      value: 5,
      label: "demo label",
      error: "demo error",
    }),
  );

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("On Change", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ value: 2, onChange: mockFn }));
  const minusButton = document.getElementsByClassName("test-subtract")[0];

  fireEvent.click(minusButton);
  expect(mockFn).toHaveBeenCalled();

  const addButton = document.getElementsByClassName("test-add")[0];

  fireEvent.click(addButton);
  expect(mockFn).toHaveBeenCalled();
});

test("Max Value", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    component({ value: 4, onChange: mockFn, max: 4 }),
  );
  const addButton = document.getElementsByClassName("test-add")[0];
  fireEvent.click(addButton);

  // onChange should not be called if value exceeds max value
  expect(mockFn).toHaveBeenCalledTimes(0);
});
