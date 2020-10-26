/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { KEY_CODES } from "constants";

import Dropdown from "../Dropdown";

afterEach(cleanup);

const options = [
  { text: "Option text 1" },
  { text: "Option text 2" },
  { text: "Option text 3" },
  { text: "Option text 4" },
];

const simpleOptions = [
  "Option text 1",
  "Option text 2",
  "Option text 3",
  "Option text 4",
];

const component = props => (
  <Dropdown
    prefixClassName="test"
    options={options}
    optionKey="text"
    {...props}
  />
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
  ).toBeGreaterThanOrEqual(1);
});

test("Options", () => {
  const { container } = render(component({ error: "error", label: "label" }));
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.focus(inputElement);
  expect(document.getElementsByClassName("test-option").length).toBe(4);
});

test("Option Key", () => {
  const newOptions = [{ title: "Option text 1" }, { title: "Option text 2" }];
  const { container } = render(
    component({
      options: newOptions,
      optionKey: "title",
      error: "error",
      label: "label",
    }),
  );
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.focus(inputElement);
  const option = document.getElementsByClassName("test-option")[0];
  expect(option).toHaveTextContent("Option text 1");
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
  fireEvent.focus(inputElement);

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
  fireEvent.focus(inputElement);
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

test("Handling Keydowns", async () => {
  // scrollIntoView is not implemented in JSDOM, this bypasses the issue.
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const mockFn = jest.fn();
  const { container } = render(component({ onChange: mockFn }));
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.focus(inputElement);
  const dropdownOption = document.getElementsByClassName("test-option")[1];
  await new Promise(r => setTimeout(r, 100));
  fireEvent.keyDown(inputElement, { key: "down", keyCode: KEY_CODES.DOWN });
  fireEvent.keyDown(inputElement, { key: "down", keyCode: KEY_CODES.DOWN });
  fireEvent.keyDown(inputElement, { key: "up", keyCode: KEY_CODES.UP });
  fireEvent.keyDown(inputElement, { key: "enter", keyCode: KEY_CODES.ENTER });
  expect(mockFn.mock.calls[0][0]).toStrictEqual({ text: "Option text 2" });
});

test("Handling Simple Mode", async () => {
  // scrollIntoView is not implemented in JSDOM, this bypasses the issue.
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const mockFn = jest.fn();
  const { container } = render(
    component({ value: "", onChange: mockFn, options: simpleOptions }),
  );
  const inputElement = container.getElementsByClassName("test-input")[0];
  fireEvent.focus(inputElement);
  await new Promise(r => setTimeout(r, 100));
  fireEvent.keyDown(inputElement, { key: "enter", keyCode: KEY_CODES.ENTER });
  expect(mockFn.mock.calls[0][0]).toStrictEqual(simpleOptions[0]);
});

test("Handling HSL Case", async () => {
  // scrollIntoView is not implemented in JSDOM, this bypasses the issue.
  window.HTMLElement.prototype.scrollIntoView = function() {};

  const mockFn = jest.fn();
  const { container } = render(
    component({ value: "Open Screen", onChange: mockFn }),
  );
  const inputElement = container.getElementsByClassName("test-input")[0];
  const inputElementText = container.getElementsByClassName(
    "test-input-input",
  )[0];
  fireEvent.focus(inputElement);
  await new Promise(r => setTimeout(r, 100));
  fireEvent.keyDown(inputElement, { key: "enter", keyCode: KEY_CODES.ENTER });
  expect(mockFn.mock.calls[0][0]).toStrictEqual(options[0]);
  expect(inputElementText.value).toBe("Open Screen");
});

test("Searching options", async () => {
  const mockFn = jest.fn();
  const { container } = render(
    component({ withSearch: true, onChange: mockFn }),
  );

  const inputElementWrapper = container.getElementsByClassName("test-input")[0];
  // only input elements support change events, not their abstractions
  const inputDOMElement = inputElementWrapper.children[0].children[0];

  fireEvent.focus(inputElementWrapper);
  fireEvent.change(inputDOMElement, { target: { value: "1" } });

  // // only one option should be present from default options ('Option text 1')
  const options = document.getElementsByClassName("test-option");
  expect(options.length).toBe(1);
});

test("Creating options", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ withCreate: true }));
  const inputElementWrapper = container.getElementsByClassName("test-input")[0];
  // only input elements support change events, not their abstractions
  const inputDOMElement = inputElementWrapper.children[0].children[0];
  fireEvent.change(inputDOMElement, { target: { value: "new option" } });
  fireEvent.focus(inputElementWrapper);
  // the option to create a new dropdown option
  const createOption = document.getElementsByClassName("test-option")[0];
  fireEvent.click(createOption);

  // clearing the search to display all possible dropdown options
  fireEvent.change(inputDOMElement, { target: { value: "" } });

  // now dropdown options should have 5 options
  const options = document.getElementsByClassName("test-option");
  expect(options.length).toBe(5);

  // confirming the option created has the right text
  const newOption = document.getElementsByClassName("test-option")[0];
  expect(newOption).toHaveTextContent("new option");
});

test("Adding Chips/Deleting Chips", async () => {
  const mockFn = jest.fn();
  const { container, getByTestId, rerender } = render(
    component({ withMultiple: true, withSearch: true, onChange: mockFn }),
  );
  const inputElementWrapper = container.getElementsByClassName("test-input")[0];
  // only input elements support change events, not their abstractions
  fireEvent.focus(inputElementWrapper);

  const options = document.getElementsByClassName("test-option");

  fireEvent.click(options[0]);

  expect(mockFn).toHaveBeenCalledTimes(1);

  rerender(
    component({
      withMultiple: true,
      value: mockFn.mock.calls[0][0],
      onChange: mockFn,
    }),
  );

  fireEvent.click(inputElementWrapper);

  // getting the updated DOM
  const chips = document.getElementsByClassName("test-input-chip");

  expect(chips.length).toBe(1);

  const chipsCross = document.getElementsByClassName("test-input-chip-icon")[0];
  // delete icon for first chip
  fireEvent.mouseDown(chipsCross);
  expect(mockFn).toHaveBeenCalledTimes(2);

  rerender(
    component({
      withMultiple: true,
      value: mockFn.mock.calls[1][0],
      onChange: mockFn,
    }),
  );
  fireEvent.click(inputElementWrapper);

  // checking if all options are available
  const optionsAfterDelete = document.getElementsByClassName("test-option");
  expect(optionsAfterDelete.length).toBe(4);
});

test("Rendering checkbox style", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    component({
      withMultiple: true,
      withSearch: true,
      onChange: mockFn,
      useCheckbox: true,
    }),
  );

  expect(getByTestId("dropdownCheckboxWrapper")).toBeInTheDocument();
});
