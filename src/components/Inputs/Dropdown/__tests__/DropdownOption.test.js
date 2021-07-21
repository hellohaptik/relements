/* eslint-env jest */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Option from "../components/Option";

afterEach(cleanup);

const component = props => <Option prefixClassName="test" {...props} />;

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("dropdown-option")).toBeInTheDocument();
});

test("Custom Class", async () => {
  const { getByTestId } = render(component({ className: "testClass" }));
  expect(getByTestId("dropdown-option")).toHaveClass("testClass");
});

test("Selected", async () => {
  const { getByTestId } = render(
    component({ className: "testClass", selected: true }),
  );
  expect(getByTestId("dropdown-option")).toHaveClass("testClass-selected");
});

test("On Click", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(component({ onClick: mockFn }));
  fireEvent.click(getByTestId("dropdown-option"));
  expect(mockFn).toHaveBeenCalled();
});

//test On Mouse Down Event
test("On Mouse Down", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(component({ onMouseDown: mockFn }));
  fireEvent.mouseDown(getByTestId("dropdown-option"));
  expect(mockFn).toHaveBeenCalled();
});

test("Ref", async () => {
  const mockRef = jest.fn();
  const mockFn = jest.fn();
  const { getByTestId } = render(
    component({ onClick: mockFn, innerRef: mockRef }),
  );
  fireEvent.click(getByTestId("dropdown-option"));
  expect(mockRef).toHaveBeenCalledTimes(1);
});
