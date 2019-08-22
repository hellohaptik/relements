/* eslint-env jest */

import React from "react";
import "jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";

import DropdownOption from "../components/DropdownOption";

afterEach(cleanup);

const component = props => <DropdownOption prefixClassName="test" {...props} />;

test("Smoke", async () => {
  const { getByTestId } = render(component());
  expect(getByTestId("dropdown-option")).toBeInTheDocument();
});

test("Custom Class", async () => {
  const { getByTestId } = render(component({ className: "testClass" }));
  expect(getByTestId("dropdown-option")).toHaveClass("testClass");
});

test("On Click", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(component({ onClick: mockFn }));
  fireEvent.click(getByTestId("dropdown-option"));
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
