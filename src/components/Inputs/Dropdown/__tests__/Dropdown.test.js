/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Dropdown from "../Dropdown";

afterEach(cleanup);

const options = [
  { text: "Option text 1" },
  { text: "Option text 2" },
  { text: "Option text 3" },
  { text: "Option text 4" },
];
const component = props => (
  <Dropdown prefixClassName="test" options={options} {...props} />
);

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("dropdown")).toBeInTheDocument();
});

test("Label", async () => {
  const { container } = render(component({ label: "label" }));
  expect(container.getElementsByClassName("test-label").length).toBe(1);
});

test("Custom Class", async () => {
  const { getByTestId } = render(component({ className: "testClass" }));
  expect(getByTestId("dropdown")).toHaveClass("testClass");
});

test("Error", async () => {
  const { container } = render(component({ error: "error", label: "label" }));
  expect(
    container.getElementsByClassName("test-error").length,
  ).toBeGreaterThanOrEqual(2);
});

test("Options", () => {
  const { container } = render(component({ error: "error", label: "label" }));
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);
  expect(document.getElementsByClassName("test-option").length).toBe(4);
});

test("Prefix class", async () => {
  const classNames = Object.keys(Dropdown.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    component({
      value: 5,
      label: "demo label",
    }),
  );

  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);

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
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.mouseDown(inputElement);
  const dropdownOption = document.getElementsByClassName("test-option")[0];

  fireEvent.click(dropdownOption);
  expect(mockFn).toHaveBeenCalled();
});

test("On Focus", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ value: 2, onFocus: mockFn }));
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.focus(inputElement);
  const dropdownOption = document.getElementsByClassName("test-option")[0];
  expect(mockFn).toHaveBeenCalled();
});

test("On Blur", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ value: 2, onBlur: mockFn }));
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.blur(inputElement);
  const dropdownOption = document.getElementsByClassName("test-option")[0];
  expect(mockFn).toHaveBeenCalled();
});
