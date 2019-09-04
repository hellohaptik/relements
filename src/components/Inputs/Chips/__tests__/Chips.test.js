/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { KEY_CODES } from "constants";

import Chips from "../Chips";

afterEach(cleanup);

const component = props => <Chips prefixClassName="test" {...props} />;

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("chips")).toBeInTheDocument();
});

test("Label", async () => {
  const { container } = render(component({ label: "label" }));
  expect(container.getElementsByClassName("test-label").length).toBe(1);
});

test("Custom Class", async () => {
  const { getByTestId } = render(component({ className: "testClass" }));
  expect(getByTestId("chips")).toHaveClass("testClass");
});

test("Prefix class", async () => {
  const classNames = Object.keys(Chips.classNames).map(className =>
    className.replace("$prefix", "test"),
  );
  const { container } = render(
    component({
      value: ["demo"],
      label: "demo label",
    }),
  );

  classNames.forEach(className => {
    expect(
      document.getElementsByClassName(className).length,
      className,
    ).toBeGreaterThanOrEqual(1);
  });
});

test("Error", async () => {
  const { container } = render(component({ error: "error", label: "label" }));
  expect(
    container.getElementsByClassName("test-error").length,
  ).toBeGreaterThanOrEqual(2);
});

test("On Change", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(component({ onChange: mockFn }));

  const inputElementWrapper = container.getElementsByClassName(
    "test-chipsInput",
  )[0];
  // only input elements support change events, not their abstractions
  const inputDOMElement =
    inputElementWrapper.children[0].children[0].children[0];

  fireEvent.change(inputDOMElement, { target: { value: ["demo"] } });
  fireEvent.keyDown(inputDOMElement, {
    key: "enter",
    keyCode: KEY_CODES.ENTER,
  });

  expect(mockFn).toHaveBeenCalled();
});

test("On Blur", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ value: [2], onBlur: mockFn }));
  const inputElement = container.getElementsByClassName("test-chipsInput")[0];
  fireEvent.blur(inputElement);
  expect(mockFn).toHaveBeenCalled();
});

test("On Focus", async () => {
  const mockFn = jest.fn();
  const { container } = render(component({ onFocus: mockFn }));
  const inputElement = container.getElementsByClassName("test-chipsInput")[0];
  fireEvent.click(inputElement);
  expect(mockFn).toHaveBeenCalled();
});

test("Adding/Deleting Chips", async () => {
  const mockFn = jest.fn();
  const { container, rerender } = render(component({ onChange: mockFn }));

  const inputElementWrapper = container.getElementsByClassName(
    "test-chipsInput",
  )[0];
  // only input elements support change events, not their abstractions
  const inputDOMElement =
    inputElementWrapper.children[0].children[0].children[0];

  fireEvent.change(inputDOMElement, { target: { value: ["demo"] } });
  fireEvent.keyDown(inputDOMElement, {
    key: "enter",
    keyCode: KEY_CODES.ENTER,
  });

  expect(mockFn).toHaveBeenCalledTimes(1);

  rerender(
    component({
      value: [mockFn.mock.calls[0][0]],
      onChange: mockFn,
    }),
  );
  // a new chip DOM Node should be added
  const chips = container.getElementsByClassName("chip");
  expect(chips.length).toBe(1);

  const updatedInputWrapper = container.getElementsByClassName(
    "test-chipsInput",
  )[0];
  const deleteButton = container.getElementsByClassName("chip")[0].children[0];
  expect(deleteButton).toHaveClass("deleteChip");
  fireEvent.click(deleteButton);

  expect(mockFn).toHaveBeenCalledTimes(2);
  rerender(
    component({
      value: mockFn.mock.calls[1][0],
      onChange: mockFn,
    }),
  );

  const updatedChips = container.getElementsByClassName("chip");
  expect(updatedChips.length).toBe(0);
});
